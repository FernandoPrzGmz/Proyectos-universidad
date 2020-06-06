/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.io.Serializable;

/**
 *
 * @author FernandoPrzGmz
 */
public class User implements Serializable{
    private int ID;
    private String nickname;
    
    public User(int ID, String nickname) {
        this.ID = ID;
        this.nickname = nickname;
    }
    
    public int getID() {
        return ID;
    }
    public void setID(int ID) {
        this.ID = ID;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
