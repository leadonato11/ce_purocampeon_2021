<?php
    if(isset($_POST['enviar'])) {
        if(!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['msg']) && !empty($_POST['asunto'])) {
            $name=$_POST['nombre'];
            $email=$_POST['email'];
            $asunto=$_POST['asunto'];
            $msg=$_POST['msg'];
            $tuCasilla="leacavs11@gmail.com";
            $header="From: ".$email."\r\n";
            $header.="Reply-To: noreply@purocampeon.com"."\r\n";
            $header.="X-Mailer: PHP/".phpversion();
            $mail=mail($tuCasilla,$asunto,$msg,$email,$header);
            if($mail) {// si el email se mando respondo éxito con javascript
                echo "<script>
                        alert('Gracias por tu contacto! en breves nos estaremos comunicando');
                        window.location='contacto.html'
                        </script>";//redirecciono a contacto.html recuerden ustedes poner el nombre de la página a la cual deberia volver luego de enviar el form
                        
            }else{//si no se pudo enviar el email lo notifico
                echo "<script>
                        alert('Lamentamos decirle que no hemos podido enviar su consulta');
                        window.location='contacto.html' 
                        </script>";//redirecciono a contacto.html recuerden ustedes poner el nombre de la página a la cual deberia volver luego de enviar el form
            }
        }
    }  
?>