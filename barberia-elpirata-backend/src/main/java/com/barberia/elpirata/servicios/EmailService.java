package com.barberia.elpirata.servicios;


public interface EmailService {
    public void sendEmail(String to, String subject, String text);

}