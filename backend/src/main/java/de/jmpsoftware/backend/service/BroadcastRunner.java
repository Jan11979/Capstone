package de.jmpsoftware.backend.service;

import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class BroadcastRunner extends Thread {

//    public static void start() {
//        ExecutorsDemo demo = new ExecutorsDemo();
//        demo.newSingleThreadScheduledExecutor();
//    }

    private void newSingleThreadScheduledExecutor() {
        System.out.println("Thread main started");

        ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();

        // Create a task
        Runnable task1 = () -> {
            System.out.println("Executing the task1 at: " + new Date());
        };

        scheduledExecutorService.scheduleAtFixedRate(task1, 0, 10, TimeUnit.MILLISECONDS);

        System.out.println("Thread main finished");
    }
}
