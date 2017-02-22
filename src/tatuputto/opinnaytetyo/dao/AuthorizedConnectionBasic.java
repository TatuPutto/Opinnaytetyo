package tatuputto.opinnaytetyo.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.apache.http.HeaderElement;
import org.apache.http.HeaderElementIterator;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeaderElementIterator;
import org.springframework.stereotype.Service;

/**
 * Muodostetaan yhteys GitHubin palvelimeen.
 * Auktorisointiin käytetään GitHubin Basic Authentication(käyttäjätunnus/salasana) implementaatiota.
 * https://developer.github.com/v3/auth/ 
 */
@Service
public class AuthorizedConnectionBasic extends Connection {
	
	/**
	 * Muodostaa yhteyden palvelimeen, lisätään pyyntöön Authorization-headerin(Basic).
	 * @param method K�ytett�v� HTTP -metodi(GET, POST, PATCH, DELETE).
	 * @param url URL-osoite, minne pyyntö lähetään.
	 * @param data Pyynnön mukana lähetettävä data.
	 * @param username Käyttäjätunnus/sovelluksen client id.
	 * @param password Käyttäjän salasana/sovelluksen client secret
	 * @return Palauttaa vastauksen sisällön String muodossa.
	 */
	public String[] formConnection(String method, String url, String data, String username, String password) {
		String[] responseContent = new String[5];
		
		//Avataan yhteys ja lisataan mukaan auktorisointi header
		try {
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpRequestBase httpMethod = setHTTPMethod(method, url, data);

			//Lisätään Authorization-header
	        String authInfo = username + ":" + password;
	        byte[] authBytes = authInfo.getBytes(StandardCharsets.UTF_8);
	        String authInfoEncoded = Base64.getEncoder().encodeToString(authBytes);
		    httpMethod.addHeader("Authorization", "Basic " + authInfoEncoded);
		    
		    //Lähetetään pyyntö
			CloseableHttpResponse response = httpClient.execute(httpMethod);
			
			//Haetaan Link-headerin arvot, seuraava sivu ja viimeinen sivu
			String nextPage = "";
			String lastPage = "";
			
			HeaderElementIterator iterator = new BasicHeaderElementIterator(response.headerIterator("Link"));
			
			int i = 0;
			while (iterator.hasNext()) {
				HeaderElement elem = iterator.nextElement();
				if(i == 0) {
					nextPage = elem.getValue().split("&")[0];
					i++;
				}
				else {
					lastPage = elem.getValue().split("&")[0];
				}
			}
			
			//Luetaan vastauksen sisältö(body)
			HttpEntity entity = response.getEntity();

			String line = "";
			String content = "";
			if (entity != null) {
			    try(BufferedReader br = new BufferedReader(new InputStreamReader(entity.getContent()))) {
			    	while ((line = br.readLine()) != null) {
			    		content = content.concat(line + "\n");
					}
			    	response.close();
			    } 
			    catch(IOException e) { 	
			    	e.printStackTrace();
			    	httpMethod.abort();
			    }
			    finally {
			    	if(response != null) {
			    		try {
			    			response.close();
			    		} 
			    		catch (IOException e) {
			    			e.printStackTrace();
			    		}
			    	}
			    }
			}
			
			//Palautetaan oleelliset vastauksesta saadut tiedot
			responseContent[0] = Integer.toString(response.getStatusLine().getStatusCode());
			responseContent[1] = response.getStatusLine().getReasonPhrase();
			responseContent[2] = content;
			responseContent[3] = nextPage;
			responseContent[4] = lastPage;
			
			return responseContent;
			
		//TODO Tarkemmat poikkeustilanteet
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Yhteytt� ei voitu muodostaa.");
		}
	
		return null;
	}
}
