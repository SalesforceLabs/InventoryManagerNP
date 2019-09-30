public with sharing class Util {
    public static Boolean debug = true;
    /**
     * @return the current ESAPI SFDCAccessController object being used to maintain the access control rules for this application.
     */
    public static SFDCAccessController AccessController {
        get {
            if (AccessController == null) {
                AccessController = new SFDCAccessController();
            }
            return AccessController;
        } private set;
    }

    public static void log(String message){
        if(debug){
            System.debug(message);
        }
    }
}