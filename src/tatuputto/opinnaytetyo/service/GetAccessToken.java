package tatuputto.opinnaytetyo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tatuputto.opinnaytetyo.controllers.AccountController;
import tatuputto.opinnaytetyo.dao.UnauthorizedConnection;

@Service
public class GetAccessToken {
	private UnauthorizedConnection unauthorizedConnection;
	
	
	@Autowired
	public GetAccessToken(UnauthorizedConnection unauthorizedConnection) {
		this.unauthorizedConnection = unauthorizedConnection;
	}
	
	
	public String getToken(String code) {
		String url = "https://github.com/login/oauth/access_token?client_id=" + 
				AccountController.clientId + "&client_secret=" + AccountController.clientSecret + "&code=" + code;
 
   		//Erotellaan access token saadusta vastauksesta
   		String[] responseContent = unauthorizedConnection.formConnection("GET", url, "");
        String[] token = responseContent[2].split("&");
        token = token[0].split("=");
        
        return token[1];
	}
}
