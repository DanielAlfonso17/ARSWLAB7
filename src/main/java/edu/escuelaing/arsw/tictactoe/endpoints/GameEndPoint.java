package edu.escuelaing.arsw.tictactoe.endpoints;

import java.io.IOException;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

import edu.escuelaing.arsw.tictactoe.Sala;

@Component
@ServerEndpoint("/game/{sala}")
public class GameEndPoint {
	 private static final Logger logger = Logger.getLogger("ETFEndpoint");
	    /* Queue for all open WebSocket sessions */
	    static Queue<Session> queue = new ConcurrentLinkedQueue<Session>();
	    
	    static Queue<Sala> salas = new ConcurrentLinkedQueue<Sala>();
	    
	    static Queue<String> nombreSala = new ConcurrentLinkedQueue<String>();


	    public static void send(String msg,Sala sala) {
	        try {
	            /* Send updates to all open WebSocket sessions */
	            for (Session s : sala.getSesiones()) {
	                s.getBasicRemote().sendText(msg);
	                logger.log(Level.INFO, "Sent: {0}", msg);
	            }
	        } catch (IOException e) {
	            logger.log(Level.INFO, e.toString());
	        }
	    }


	    @OnMessage
	    public void processPoint(String message, Session session) {
	        System.out.println("Point received:" + message + ". From session: " + session);
	        for(Sala sala: salas) {
	        	if(sala.getSesiones().contains(session)) {
	        		this.send(message,sala);
	        	}
	        		
	        }
	        
	    }
	    
	    @OnOpen
	    public void openConnection(Session session, @PathParam("sala") String sala) {
	    	if(nombreSala.contains(sala)) {
		    	for(Sala s: salas) {
		    		if(s.getNombre().equals(sala)) {
		    			s.addSession(session);
		    		}
		    	}
	    	}else {
	    		Sala s = new Sala(sala);
	    		nombreSala.add(sala);
	    		salas.add(s);
	    		s.addSession(session);	
	    	}
	        /* Register this connection in the queue */
	        queue.add(session);
	        logger.log(Level.INFO, "Connection opened.");
	        System.out.println(salas);
	        try {
	            session.getBasicRemote().sendText("Connection established.");
	        } catch (IOException ex) {
	            Logger.getLogger(GameEndPoint.class.getName()).log(Level.SEVERE, null, ex);
	        }
	    }

	    @OnClose
	    public void closedConnection(Session session) {
	        /* Remove this connection from the queue */
	        queue.remove(session);
	        logger.log(Level.INFO, "Connection closed.");
	    }


	    @OnError
	    public void error(Session session, Throwable t) {
	        /* Remove this connection from the queue */
	        queue.remove(session);
	        logger.log(Level.INFO, t.toString());
	        logger.log(Level.INFO, "Connection error.");
	    }

}
