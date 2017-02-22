package tatuputto.opinnaytetyo.domain;

public class User {
	private int id;
	private String login;
	private String avatarUrl;
	private String accessToken;
	
	
	public User(int id, String login, String avatarUrl) {
		this.id = id;
		this.login = login;
		this.avatarUrl = avatarUrl;
	}
	
	public User(int id, String login, String avatarUrl, String accessToken) {
		this.id = id;
		this.login = login;
		this.avatarUrl = avatarUrl;
		this.accessToken = accessToken;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	
	public String getAvatarUrl() {
		return avatarUrl;
	}
	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
	
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	
	public String toString() {
		return id + ", " + login + ", " + accessToken;
	}
}
