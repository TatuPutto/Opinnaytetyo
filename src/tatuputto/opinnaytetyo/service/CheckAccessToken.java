package tatuputto.opinnaytetyo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tatuputto.opinnaytetyo.controllers.AccountController;
import tatuputto.opinnaytetyo.dao.AuthorizedConnectionBasic;
import tatuputto.opinnaytetyo.domain.User;
import tatuputto.opinnaytetyo.service.ParseAuthorizationInfo;

@Service
public class CheckAccessToken {
	private AuthorizedConnectionBasic authorizedConnection;
	private ParseAuthorizationInfo parseAuthorizationInfo;

	@Autowired
	public CheckAccessToken(AuthorizedConnectionBasic authorizedConnection, 
			ParseAuthorizationInfo parseAuthorizationInfo) {
		this.authorizedConnection = authorizedConnection;
		this.parseAuthorizationInfo = parseAuthorizationInfo;
	}
	
	public User isValidAccessToken(String accessToken) {
		//Liitetään urliin get-parametreiksi sovellukselle rekisteröity id ja secret
		String id = AccountController.clientId;
		String secret = AccountController.clientSecret;
		String url = "https://api.github.com/applications/" + id + "/tokens/" + accessToken + "";
		
		String[] responseContent = authorizedConnection.formConnection("GET", url, "", id, secret);
	    		
		//Jos accesstoken ei ole enää voimassa vastauksena saadaan vastauskoodi 404 - not found
		if(responseContent[0].equals("200")) {
			System.out.println("Access token on voimassa.");
			
			User user = parseAuthorizationInfo.parseJSON(responseContent[2]);
			user.setAccessToken(accessToken);
			
			return user;
		}
		else {
			System.out.println("Access token ei ole enää voimassa.");
	    	return null;
		}	
	}
}
