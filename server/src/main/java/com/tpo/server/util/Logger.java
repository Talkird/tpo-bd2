package com.tpo.server.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Logger {
    private static FileWriter logFile = null;

    public static void initializeLogFile() {
        try {
            logFile = new FileWriter("logs.txt", true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void appendChange(String message) throws IOException {
        if (logFile != null) {
            BufferedWriter writer = new BufferedWriter(logFile);
            writer.append(message);
            writer.newLine();
            writer.close();
        } else {
            System.out.println("Log file not initialized");
        }
    }
}
