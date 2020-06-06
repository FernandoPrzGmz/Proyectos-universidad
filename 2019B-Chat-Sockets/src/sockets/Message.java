/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author FernandoPrzGmz
 * Interfaz serializada para convertir el objeto en un sucesion de bits
 * 
 * Codigos de accion:
 *  "00" - Desconexion
 *  "01" - Mensaje privado
 *  "10" - Mensaje publico
 *  "11" - Conexion
 */
public class Message implements Serializable{
    private String codeAction;
    private String nickname;
    private String message;

    private int toID;
    private ArrayList<User> listClients;
    
    private int codeStatus;
    private String logMessage;
    
    // Getters and Setters
    public String getCodeAction() {
        return codeAction;
    }
    public void setCodeAction(String codeAction) {
        this.codeAction = codeAction;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
   
    public int getToID() {
        return toID;
    }
    public void setToID(int toID) {
        this.toID = toID;
    }
    public ArrayList<User> getListClients() {
        return listClients;
    }
    public void setListClients(ArrayList<User> listClients) {
        this.listClients = listClients;
    }
    
    public int getCodeStatus() {
        return codeStatus;
    }
    public void setCodeStatus(int codeStatus) {
        this.codeStatus = codeStatus;
    }
    public String getLogMessage() {
        return logMessage;
    }
    public void setLogMessage(String logMessage) {
        this.logMessage = logMessage;
    }
    
    // Utils
    public static void printList(ArrayList<User> listClients){
        System.out.println("Inicia la impresion de clientes:");
        listClients.forEach((client) -> System.out.format("[%d] - %s, ", client.getID(), client.getNickname()));
        System.out.println("\nTermina la impresion de clientes.");
    }
}
