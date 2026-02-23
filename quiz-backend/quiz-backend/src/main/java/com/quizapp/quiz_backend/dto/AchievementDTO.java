package com.quizapp.quiz_backend.dto;

public class AchievementDTO {


	    private String title;
	    private String icon;
	    private String color;

	    public AchievementDTO(String title, String icon, String color) {
	        this.title = title;
	        this.icon = icon;
	        this.color = color;
	    }

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getIcon() {
			return icon;
		}

		public void setIcon(String icon) {
			this.icon = icon;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}

	    // getters
	}
