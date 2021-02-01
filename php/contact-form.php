<?php
    if(isset($_POST['enviar'])) {
        if(!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['msg'])) {
            $name=$_POST['nombre'];
            $email=$_POST['email'];
            $asunto=$_POST['asunto'];
            $msg=$_POST['msg'];
            $header="From: noreply@purocampeon.com"."\r\n";
            $header.="Reply-To: noreply@purocampeon.com"."\r\n";
            $header.="X-Mailer: PHP/".phpversion();
            $mail=mail($email,$asunto,$msg,$header);
            if($mail){
                echo "<h4>El mensaje se envió con éxito!</h4>";
            }else{//si no se pudo enviar el email lo notifico
                echo "<h4> Algo falló con el envío!</h4>";
            }
        }
    }  
?>