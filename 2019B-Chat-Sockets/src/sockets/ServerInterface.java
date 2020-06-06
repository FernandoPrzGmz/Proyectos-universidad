/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author FernandoPrzGmz
 */
public class ServerInterface extends Thread{
    private int ID;
    private String nickname;
    private Socket socket;
    private Servidor serverForm;

    private ObjectInputStream inputBuffer;
    private ObjectOutputStream outputBuffer;

    // Constructor
    public ServerInterface(Socket socket, Servidor serverForm) {
        this.socket = socket;
        this.serverForm = serverForm;
        this.ID = serverForm.getNumID();
        
        try {
            this.inputBuffer = new ObjectInputStream(this.socket.getInputStream());
            this.outputBuffer = new ObjectOutputStream(this.socket.getOutputStream());
        } catch (IOException ex) {
            Logger.getLogger(ServerInterface.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    // RUN
    public void run(){
        while(true && this.ID >= 0) {
            // Se toma el mensaje
            Message messageFromClient;
            try { messageFromClient = (Message) this.inputBuffer.readObject(); }
            catch (IOException | ClassNotFoundException ex) {
                System.out.format("Error en hilo de cliente: %s\n", ex.getMessage());
                break;
            }
            System.out.format("\n\nCodigo: %s\n", messageFromClient.getCodeAction());

            // En base al codigo se ejecutan las acciones del cliente
            switch(messageFromClient.getCodeAction()) {
                // Conexion
                case "11":
                    this.nickname = messageFromClient.getNickname();
                    System.out.format("El usuario %s solicita conectar\n", this.nickname);

                    messageFromClient.setCodeStatus(211);
                    messageFromClient.setListClients(this.createListClient());
                    this.sendPublic(messageFromClient);
                    System.out.println("Ya envie el estado al cliente para conectar.");

                    this.serverForm.appendMessageInLogPanel(
                        "\n-----------------------------" +
                        "\nUn cliente se ha conectado." +
                        "\nIdentificador: " + this.ID +
                        "\nNickname: "+ messageFromClient.getNickname() +
                        "\n-----------------------------\n"
                    );
                    break;


                // Desconexion
                case "00":
                    System.out.format("El usuario %s solicita desconectar\n", this.nickname);

                    // Actualizamos el estado de la conexion
                    this.ID = -1;
                    
                    messageFromClient.setCodeStatus(200);
                    messageFromClient.setListClients(this.createListClient());
                    this.sendPublic(messageFromClient);

                    this.serverForm.appendMessageInLogPanel(
                        "\n-----------------------------" +
                        "\nUn cliente se ha desconectado." +
                        "\nIdentificador: " + this.ID +
                        "\nNickname: "+ messageFromClient.getNickname() +
                        "\n-----------------------------\n"
                    );
                    System.out.println("Envie el codigo 200 al cliente para desconectar");
                    break;


                // Mensaje publico
                case "01":
                    messageFromClient.setCodeStatus(200);
                    this.sendPublic(messageFromClient);

                    this.serverForm.appendMessageInLogPanel(
                        "\n-----------------------------" +
                        "\nUn cliente ha enviado un mensaje publico." +
                        "\nIdentificador: " + this.ID +
                        "\nPara: Todos los clientes" +
                        "\nNickname: "+ messageFromClient.getNickname() +
                        "\nMensaje: " + messageFromClient.getMessage() +
                        "\n-----------------------------\n"
                    );
                    System.out.println("\nEnvie el codigo 200 al cliente para un mensaje publico");
                    break;


                // Mesaje privado
                case "10":
                    messageFromClient.setCodeStatus(200);
                    this.sendPrivate(messageFromClient, messageFromClient.getToID());

                    this.serverForm.appendMessageInLogPanel(
                        "\n-----------------------------" +
                        "\nUn cliente ha enviado un mensaje privado." +
                        "\nIdentificador: " + this.ID +
                        "\nPara Identificador: " + messageFromClient.getToID() +
                        "\nNickname: "+ messageFromClient.getNickname() +
                        "\nMensaje: " + messageFromClient.getMessage() +
                        "\n-----------------------------\n"
                    );
                    System.out.println("Envie el codigo 200 al cliente para un mensaje privado");
                    break;
                default:
                    break;
            }

        }
    }
    // Getter and Setter
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public int getID(){
        return ID;
    }
    
    // Utils
    public void printList(){
        System.out.println("[Interfaz] Clientes:");
        this.serverForm.getListClients().forEach((client) -> System.out.format("[%d] - %s, ", client.ID, client.getNickname()));
    }
    public ArrayList<User> createListClient() {
        ArrayList<User> listClient = new ArrayList<User>();
        // Se recorre la lista para crear los objetos User
        this.serverForm.getListClients().forEach((client) -> {
            listClient.add(new User(client.ID, client.getNickname()));
        });
        return listClient;
    }
    // -------------------
    public void sendPublic(Message message) {
        this.serverForm.getListClients().forEach((client) -> {
            if(client.getID() != this.ID && client.getID() >= 0){
               try {
                   client.outputBuffer.writeObject(message);
               } catch (IOException ex) {
                   System.out.format("Error: %s\n", ex);
               }   
            }
        });
    }   
    public void sendPrivate(Message message, int id) {
        this.serverForm.getListClients().forEach((client) -> {
            if(client.getID() == id){
                try {
                    client.outputBuffer.writeObject(message);
                } catch (IOException ex) {
                    System.out.format("Error: %s\n", ex);
                }
            }
        });
    }
}
