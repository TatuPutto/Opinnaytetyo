package tatuputto.opinnaytetyo.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tatuputto.opinnaytetyo.domain.User;
import tatuputto.opinnaytetyo.service.CheckAccessToken;
import tatuputto.opinnaytetyo.service.GetAccessToken;



@Controller
public class AccountController {
	//Sovellukselle rekisteröidyt avaimet.
    public static final String clientId = "566fea61a0cebae27268";
	public static final String clientSecret = "87454f258250d9170e31a8f13b51e6a612bd6545";
	
	private GetAccessToken getAccessToken;
	private CheckAccessToken checkAccessToken;
	
	
	@Autowired
	public AccountController(CheckAccessToken checkAccessToken, GetAccessToken getAccessToken) {
		this.getAccessToken = getAccessToken;
		this.checkAccessToken = checkAccessToken;
	}
	

	//Ohjataan nämä pyynnöt selainsovellukselle.
	@RequestMapping(value = {
		"/", 
		"/gists", 
		"/starred", 
		"/discover",
		"/search/{user}",
		"/gist/{id}",
		"/edit/{id}",
		"/create"
	})
	public String redirect() {
		return "forward:/index.html";
	}
	
			
	
	
	
	//Valtuutusprosessi vaihe 1. Ohjataan käyttäjä GitHubin sivuille valtuuttamista varten.
	@RequestMapping("/authorize")
	public void sendUserToAuthorizationService(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
		response.sendRedirect("https://github.com/login/oauth/authorize?client_id=566fea61a0cebae27268&scope=gist");	
	}
	
	
	//Valtuutusprosessi vaihe 2. Vaihdetaan koodi käyttöavaimeen.
	@RequestMapping("/getaccesstoken")
	public void getAccessToken(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
		String codeToExchange = request.getParameter("code");
		String token = getAccessToken.getToken(codeToExchange);
		
   		response.sendRedirect("getuserinfo?token=" + token);	
	}
	
	
	//Valtuutusprosessi vaihe 3. Tarkistetaan onko käyttöavain aito. 
	@RequestMapping("/getuserinfo")
	public void checkLogin(@RequestParam("token") String token,
			HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
		//Jos on, haetaan avaimeen sidotun käyttäjän tiedot.
		User user = checkAccessToken.isValidAccessToken(token);
		System.out.println(user);
		
		//Muodostetaan tiedoista evästeet.
		if(user != null) {
			//Eväste käyttäjätunnukselle.
			Cookie id = new Cookie("id", String.valueOf(user.getId()));
			id.setMaxAge(60*60*24*7); 
			response.addCookie(id);
			
			//Eväste käyttäjätunnukselle.
			Cookie login = new Cookie("login", user.getLogin());
			login.setMaxAge(60*60*24*7); 
			response.addCookie(login);
			
			//Eväste käyttäjäkuvalle.
			Cookie avatarUrl = new Cookie("avatarurl", user.getAvatarUrl());
			avatarUrl.setMaxAge(60*60*24*7); 
			response.addCookie(avatarUrl);
					
			//Eväste access tokenille.
			Cookie accessToken = new Cookie("accesstoken", user.getAccessToken());
			accessToken.setMaxAge(60*60*24*7); 
	   		response.addCookie(accessToken);
			
	   		response.sendRedirect("http://localhost:8080/opinnaytetyo/");
		}
		//Jos käyttöavain ei ole enää voimassa, poistetaan evästeet.
		else {
			response.sendRedirect("http://localhost:8080/opinnaytetyo/logout");	
		}
	}
	
	
	//Ohjataan käyttäjä kirjautumissivulle.
	@RequestMapping("/login")
	public String forwardToLogin() {
		return "forward:/loginform.html";
	}
	
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
		Cookie id = new Cookie("id", "");
		id.setMaxAge(0); 
		response.addCookie(id);
		
		Cookie login = new Cookie("login", "");
		login.setMaxAge(0); 
		response.addCookie(login);
		
		Cookie avatarUrl = new Cookie("avatarurl", "");
		avatarUrl.setMaxAge(0); 
		response.addCookie(avatarUrl);
				
		Cookie accessToken = new Cookie("accesstoken", "");
		accessToken.setMaxAge(0); 
   		response.addCookie(accessToken);
				
		response.sendRedirect("login");	
	}
}
