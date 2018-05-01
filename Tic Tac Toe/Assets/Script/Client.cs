using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;
using System;

public class Client : MonoBehaviour {

    WebSocket ws;
    public Client()
    {
        ws = new WebSocket("wss://localhost:8080/");
        Debug.Log("new Client");
        using (ws)
        {
            ws.OnError += (sender, e) =>
            {
                Debug.Log("Error Occurred: " + e.Message);
            };
            ws.OnMessage += (sender, e) =>
            {
                Debug.Log("Client: " + e.Data);
            };
        }

        //using (ws = new WebSocket("localhost"))
        //{
        //    ws.OnMessage += (sender, e) =>
        //    {
        //        Console.WriteLine("Client: " + e.Data);
        //    };
        //    ws.OnClose += (sender, e) =>
        //    {
        //        Console.WriteLine("Connection Closed");
        //    };
        //    ws.OnError += (sender, e) =>
        //    {
        //        Console.WriteLine("Error Occurred: " + e.Message);
        //    };

        //    ws.Connect();
        //   // ws.SendAsync("Connected", null); //if we want to do something when send is complete, set completed to any Action<bool> delegate
        //}
    }

    public void Connect()
    {
        using (ws)
        {
            ws.Connect();
            Debug.Log("Clicked Connect: " + ws.IsConnected);
        }

    }
    public void Send(String msg)
    {
        if (ws.IsConnected)
        {
            ws.Send(msg);
        }
        ws.Send(msg);
    }
}
