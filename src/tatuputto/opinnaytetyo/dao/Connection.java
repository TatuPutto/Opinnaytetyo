package tatuputto.opinnaytetyo.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.springframework.stereotype.Service;

@Service
public class Connection {
	/**
	 * Palautetaan HTTP -metodin(GET, POST, PATCH, DELETE) k�sittelyn hoitavan luokan referenssi hy�dynt�en polymorfismia.
	 * @param method K�ytett�v� HTTP -metodi(GET, POST, PATCH, DELETE).
	 * @param url URL-osoite, minne pyynt� l�het��n.
	 * @param data Pyynn�n mukana l�hetett�v� data.
	 * @param accessToken K�ytt�j�kohtainen avain, jonka avulla voidaan tehda muutoksia k�ytt�j�n gisteihin API:n v�lityksell�.
	 * @return Referenssi HTTP -metodin k�sittelev��n luokkaan(HttpGet, HttpPost, HttpPatch, HttpDelete).
	 */
	protected HttpRequestBase setHTTPMethod(String method, String url, String data) {
		if(method.equals("GET")) {
			HttpGet httpGet = new HttpGet(url);
			return httpGet;
		}
		else if(method.equals("POST")) {
			HttpPost httpPost = new HttpPost(url);
			httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");
			StringEntity params;
			
			try {
				params = new StringEntity(data);
				httpPost.setEntity(params);
				return httpPost;
			}
			catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		else if(method.equals("PATCH")) {
			HttpPatch httpPatch = new HttpPatch(url);
			httpPatch.addHeader("Content-Type", "application/x-www-form-urlencoded");
			StringEntity params;
			
			try {
				params = new StringEntity(data);
				httpPatch.setEntity(params);
				return httpPatch;
			}
			catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		else if(method.equals("DELETE")) {
			HttpDelete httpDelete = new HttpDelete(url);
			return httpDelete;
		}
		
		return null;
	}
	
	
	/**
	 * Lukee vastauksen sis�ll�n.
	 * @param response Palvelimen vastaus l�hetettyyn pyynt��n.
	 * @return Vastauksen sis�lt�(body, ei headereita) String muodossa.
	 */
	protected ArrayList<String> readResponse(CloseableHttpResponse response) {
		ArrayList<String> responseContent = new ArrayList<String>();
		responseContent.add(Integer.toString(response.getStatusLine().getStatusCode()));
		responseContent.add(response.getStatusLine().getReasonPhrase());
	
		HttpEntity entity = response.getEntity();
		
		String line = "";
		String str = "";
		
	    if (entity != null) {
	    	//K�sitell��n vastauksen sis�lt� rivi kerrallaan
	        try(BufferedReader br = new BufferedReader(new InputStreamReader(entity.getContent()))) {
	        	while ((line = br.readLine()) != null) {
	        		str = str.concat(line + "\n");
				}
	        	//System.out.println(str);
	        	response.close();
	        	responseContent.add(str);
	        	return responseContent;
	        } 
	        catch(IOException e) { 	
	        	//System.out.println("Vastausta ei pystytty lukemaan.");
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
	    return null;
	}
}
