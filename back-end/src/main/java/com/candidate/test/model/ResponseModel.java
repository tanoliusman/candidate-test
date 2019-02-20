package com.candidate.test.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ResponseModel {

	private boolean success;
	private String message;
//	private Object data;
	
	
	public ResponseModel() {
		super();
	}
	public ResponseModel(boolean success, String message, Object data) {
		super();
		this.success = success;
		this.message = message;
//		this.data = data;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String isMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
//	public Object getData() {
//		return data;
//	}
//	public void setData(Object data) {
//		this.data = data;
//	}
	@Override
	public String toString() {
		return "ResponseModel [success=" + success + ", message=" + message + ", data=]";
	}
	
	
}
