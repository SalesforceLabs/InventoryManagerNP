public with sharing class Util {
    public static Boolean debug = false;

    public static void log(String message){
        if(debug){
            System.debug(message);
        }
    }
}