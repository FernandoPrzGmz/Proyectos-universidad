/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;
/*
El cliente tiene un hilo que solo escucha al servidor por el socket

*/
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author FernandoPrzGmz
 */
public class Cliente extends javax.swing.JFrame implements Runnable {
    private String nickname;
    private String serverHost;
    private int serverPort;
    private Socket socket;
    
    private Thread myThread;

    private ObjectInputStream inputBuffer;
    private ObjectOutputStream outputBuffer;
    /**
     * Creates new form Chat
     */
    public Cliente() {
        initComponents();
        
        // NOTE: Con esto centramos la interfaz
        this.setLocationRelativeTo(null);
        
        jTextFieldMessage.setEnabled(false);
        jBtnSubmit.setEnabled(false);
        jBtnDisconnect.setEnabled(false);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabelStatus = new javax.swing.JLabel();
        jLabelUser = new javax.swing.JLabel();
        jLabelHost = new javax.swing.JLabel();
        jLabelP = new javax.swing.JLabel();
        jLabelStatusLabel = new javax.swing.JLabel();
        jLabelUserLabel = new javax.swing.JLabel();
        jLabelMessage = new javax.swing.JLabel();
        jTextFieldHost = new javax.swing.JTextField();
        jTextFieldPort = new javax.swing.JTextField();
        jTextFieldMessage = new javax.swing.JTextField();
        jBtnConnect = new javax.swing.JButton();
        jBtnDisconnect = new javax.swing.JButton();
        jBtnSubmit = new javax.swing.JButton();
        jScrollPane1 = new javax.swing.JScrollPane();
        jTextAreaMessages = new javax.swing.JTextArea();
        jScrollPane2 = new javax.swing.JScrollPane();
        jListContacts = new javax.swing.JList<>();
        jLabel1 = new javax.swing.JLabel();
        jTextFieldNickname = new javax.swing.JTextField();
        jLabelPort = new javax.swing.JLabel();
        jCheckBoxAllClients = new javax.swing.JCheckBox();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setBackground(new java.awt.Color(255, 255, 255));

        jLabelStatus.setText("Desconectado");

        jLabelHost.setText("Host:");

        jLabelP.setText("Port:");

        jLabelStatusLabel.setText("Estado:");

        jLabelUserLabel.setText("Mensajes");

        jLabelMessage.setText("Mensaje:");

        jBtnConnect.setText("Conectar");
        jBtnConnect.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jBtnConnectActionPerformed(evt);
            }
        });

        jBtnDisconnect.setText("Desconectar");
        jBtnDisconnect.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jBtnDisconnectActionPerformed(evt);
            }
        });

        jBtnSubmit.setText("Enviar");
        jBtnSubmit.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jBtnSubmitActionPerformed(evt);
            }
        });

        jTextAreaMessages.setEditable(false);
        jTextAreaMessages.setColumns(20);
        jTextAreaMessages.setRows(5);
        jScrollPane1.setViewportView(jTextAreaMessages);

        jListContacts.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        jScrollPane2.setViewportView(jListContacts);

        jLabel1.setText("Nickname:");

        jCheckBoxAllClients.setText("Todos los contactos");
        jCheckBoxAllClients.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jCheckBoxAllClientsActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jLabelHost, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jLabel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jTextFieldHost, javax.swing.GroupLayout.PREFERRED_SIZE, 121, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jTextFieldNickname, javax.swing.GroupLayout.PREFERRED_SIZE, 123, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabelP, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jTextFieldPort, javax.swing.GroupLayout.PREFERRED_SIZE, 54, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jLabelPort, javax.swing.GroupLayout.DEFAULT_SIZE, 91, Short.MAX_VALUE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jBtnDisconnect, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jBtnConnect, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGap(308, 308, 308)
                        .addComponent(jLabelUser, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabelStatusLabel)
                        .addGap(18, 18, 18)
                        .addComponent(jLabelStatus, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addGap(99, 99, 99))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jLabelMessage, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                .addComponent(jScrollPane2, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                                .addComponent(jCheckBoxAllClients, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jTextFieldMessage)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jBtnSubmit))
                            .addComponent(jScrollPane1)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabelUserLabel)
                                .addGap(0, 0, Short.MAX_VALUE)))))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jBtnConnect)
                    .addComponent(jTextFieldPort, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabelP)
                    .addComponent(jTextFieldHost, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabelHost))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jBtnDisconnect)
                    .addComponent(jLabel1)
                    .addComponent(jTextFieldNickname, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabelPort))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabelStatusLabel)
                    .addComponent(jLabelStatus))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabelUserLabel)
                    .addComponent(jLabelUser)
                    .addComponent(jCheckBoxAllClients))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jScrollPane1)
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.DEFAULT_SIZE, 180, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jTextFieldMessage, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jBtnSubmit)
                    .addComponent(jLabelMessage))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     * Evento de 'BtnConnect'
     * @param evt 
     */
    private void jBtnConnectActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jBtnConnectActionPerformed
        // Se optiene el valor de los inputs si llega vacio se le asigna un valor por defecto
        this.serverHost = "".equals(jTextFieldHost.getText()) ? "127.0.0.1" : jTextFieldHost.getText();
        this.serverPort = "".equals(jTextFieldPort.getText()) ? 9001 : Integer.parseInt(jTextFieldPort.getText());
        this.nickname = "".equals(jTextFieldNickname.getText()) ? "Anonymous" : jTextFieldNickname.getText();
        
        this.connect();
        
        myThread = new Thread(this);
        myThread.start();
        
        jLabelStatus.setText("Conectado en " + this.serverHost + ":" + this.serverPort);
        jTextFieldMessage.setEnabled(true);
        jBtnDisconnect.setEnabled(true);
        jBtnSubmit.setEnabled(true);
        jBtnConnect.setEnabled(false);
    }//GEN-LAST:event_jBtnConnectActionPerformed

    /**
     * Evento de 'BtnDisconnect'
     * @param evt 
     */
    private void jBtnDisconnectActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jBtnDisconnectActionPerformed
        // Se limpian los datos
        this.serverHost = null;
        this.serverPort = 0;
        
        this.disconnect();
        
        jLabelStatus.setText("Desconectado");
        jListContacts.setListData(new String[0]);
        jTextFieldMessage.setEnabled(false);
        jBtnSubmit.setEnabled(false);
        jBtnDisconnect.setEnabled(false);
        jBtnConnect.setEnabled(true);
    }//GEN-LAST:event_jBtnDisconnectActionPerformed

    /**
     * Evento de 'BtnSubmit'
     * @param evt 
     * 
     */
    private void jBtnSubmitActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jBtnSubmitActionPerformed
        jTextAreaMessages.append("\nTu: "+ jTextFieldMessage.getText());
        this.send(jCheckBoxAllClients.isSelected(), jListContacts.getSelectedValue(), jTextFieldMessage.getText());
    }//GEN-LAST:event_jBtnSubmitActionPerformed

    private void jCheckBoxAllClientsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jCheckBoxAllClientsActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jCheckBoxAllClientsActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Cliente.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Cliente.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Cliente.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Cliente.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Cliente().setVisible(true);
            }
        });
    }
    
    public void connect(){
        // Se crea el objeto a enviar
        Message message = new Message();
        message.setCodeAction("11");
        message.setNickname(this.nickname);

        try {
            // Creación del socket y del buffer
            this.socket = new Socket(this.serverHost, this.serverPort);
            this.outputBuffer = new ObjectOutputStream(this.socket.getOutputStream());
            this.inputBuffer = new ObjectInputStream(this.socket.getInputStream());
            System.out.println("Se creo la conexion con el servidor");
            
            // Se envia el objeto a traves del buffer 
            this.outputBuffer.writeObject(message);
            System.out.println("Envie un mensaje al Servidor para conectar");
        } catch (IOException ex) {
            System.out.format("Error: Fallo al enviar. \n%s\n", ex.getMessage());
        }
    }
    
    public void disconnect(){
        // Se crea el objeto a enviar
        Message message = new Message();
        message.setCodeAction("00");
        message.setNickname(this.nickname);

        try {
            // Se envia el objeto a traves del buffer 
            this.outputBuffer.writeObject(message);
            System.out.println("Envie un mensaje al Servidor para desconectar");
        } catch (IOException/* | ClassNotFoundException*/ ex) {
            System.out.format("Error: Fallo al enviar. \n%s\n", ex.getMessage());
        }
    }
    
    public void send(boolean isPublic, String toClient, String txtMessage) {
        // Se crea el objeto a enviar
        Message message = new Message();
        message.setNickname(this.nickname);
        message.setMessage(txtMessage); 
        // Mensaje publico
        if(isPublic) {
            message.setCodeAction("01");
        // Mensaje privado
        } else {
            // Obtener el ID
            int toID = 0;
            Matcher mID = Pattern.compile("(?<=\\{)(.*?)(?=\\})").matcher(toClient);
            while(mID.find()) {
              toID = Integer.parseInt(mID.group(1));
            }
            // Se establece el codigo segun el tipo de mensaje
            message.setCodeAction("10");
            message.setToID(toID);
        }
        
        // Se envia el mensaje
        try {
            this.outputBuffer.writeObject(message);
            System.out.format("Envie un mensaje %s al Servidor.\n", isPublic ? "publico" : "privado");
        } catch (IOException ex) {
            System.out.format("Error: Fallo al enviar. \n%s\n", ex.getMessage());
        }
    }
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jBtnConnect;
    private javax.swing.JButton jBtnDisconnect;
    private javax.swing.JButton jBtnSubmit;
    private javax.swing.JCheckBox jCheckBoxAllClients;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabelHost;
    private javax.swing.JLabel jLabelMessage;
    private javax.swing.JLabel jLabelP;
    private javax.swing.JLabel jLabelPort;
    private javax.swing.JLabel jLabelStatus;
    private javax.swing.JLabel jLabelStatusLabel;
    private javax.swing.JLabel jLabelUser;
    private javax.swing.JLabel jLabelUserLabel;
    private javax.swing.JList<String> jListContacts;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private static javax.swing.JTextArea jTextAreaMessages;
    private javax.swing.JTextField jTextFieldHost;
    private javax.swing.JTextField jTextFieldMessage;
    private javax.swing.JTextField jTextFieldNickname;
    private javax.swing.JTextField jTextFieldPort;
    // End of variables declaration//GEN-END:variables

    public ObjectInputStream getInputBuffer() {
        return inputBuffer;
    }
    public static void appendMessage(String message) {
        jTextAreaMessages.append(message);
    }
    public void appendListClients(Message messageFromServer){
        // Lista de conectados
        ArrayList<String> listNickname = new ArrayList<String>();
        messageFromServer.getListClients().forEach(client ->{
            if(client.getID() >= 0){
                listNickname.add("{"+client.getID()+"}["+client.getNickname()+"]");
            }
        });
        jListContacts.setListData(listNickname.toArray(new String[0]));
    }

    @Override
    public void run() {
        loop: while(true) {
            // Se toma el mensaje del cliente
            Message messageFromServer;
            try {
                // Mensaje recibido desde el servidor
                messageFromServer = (Message) this.inputBuffer.readObject();
            } catch (IOException | ClassNotFoundException ex) {
                System.out.format("Error en hilo de cliente: %s\n", ex.getMessage());
                break loop;
            }
            
            // Se procesa el tipo de accion
            switch (messageFromServer.getCodeAction()) {
                case "11":
                    System.out.println("Entre a 11");
                    this.appendListClients(messageFromServer);
                    break;
                case "00":
                    System.out.println("Entre a 00");
                    this.appendListClients(messageFromServer);
                    
//                    try {
//                        this.socket.close();
//                        this.inputBuffer.close();
//                        this.outputBuffer.close();
//                    } catch(IOException ex){
//                        System.out.format("Error al cerrar sockets:  %s", ex);
//                    }
//
//
//                    this.socket = null;
//                    this.inputBuffer = null;
//                    this.outputBuffer = null;
//                    break loop;
                    break;
                case "01":
                    System.out.format("Recibi mensaje publico: %s\n", messageFromServer.getMessage());
                    // Editamos el text area de los mensajes
                    jTextAreaMessages.append( "\n" + messageFromServer.getNickname() + "[Public]: " + messageFromServer.getMessage());
                    break;
                case "10":
                    System.out.format("Recibi mensaje privado: %s\n", messageFromServer.getMessage());
                    // Editamos el text area de los mensajes
                    jTextAreaMessages.append( "\n" + messageFromServer.getNickname() + "[Private]: " + messageFromServer.getMessage());
                    break;
                default:
                    System.out.format("Error: No se reconoce la acción\n");
                    break;
            }
        }
    }
}