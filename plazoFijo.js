var historialInversiones=[]
var tasa= 27

$(document).ready(function(){

    $("#calcular").click(function(){
        var capital= parseInt( $("#inputCapital").val() )
        var plazo= parseInt($("#inputPlazo").val() )    



        if (isNaN(capital)===true|| capital<1000){

            $('#inputCapital').css({border: "1px solid red"})
            $('.errorCapital').css({border: "1px solid red", background:"white", color: "red"})
            return false
        }
        else{
            $('#inputCapital').css({border: "none"})
            $('.errorCapital').css({border: "none", background:"#D9593D", color: "black"})
            

            if(isNaN(plazo)||(plazo<30) || (plazo>365)){

                $('#inputPlazo').css({border: "1px solid red"})         
                $('.errorPlazo').css({border: "1px solid red", background:"white", color: "red"})
                return false
            }
            else{
                $('#inputPlazo').css({border: "none"})         
                $('.errorPlazo').css({border: "none", background:"#D9593D)", color: "black"})

                var formularioPrincipal=document.getElementById("formularioPrincipal");
                formularioPrincipal.addEventListener("submit", validarFormulario);
                function validarFormulario(e){
                    e.preventDefault();
                }

                var interes= parseFloat(((capital*(tasa/100)/365)* plazo).toFixed(2))
                var montoFinal= capital+ interes

                console.log("Intereses ganados: $" + interes+ "\nMonto final: $" + (capital+interes))



// tabla de resultados
                $("#formularioPrincipal").append( `
                
                    <div class="resultado" id="tabla" style="display:none;">
                        <table>
                            <tr>
                                <td> Capital </td>
                                <td>
                                    $${capital}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Plazo
                                </td>
                                <td>
                                    ${plazo}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Intereses ganados
                                </td>
                                <td>
                                    $${interes}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Monto total
                                </td>
                                <td>
                                    $${montoFinal}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    TNA
                                </td>
                                <td>
                                    ${tasa}%
                                </td>
                            </tr>
                        </table>
                        <button class="regresar">Regresar</button>
                    </div>
                `)

                $('.contenido').fadeOut("slow", function(){
                    $('.resultado').fadeIn(2000)
                
                    $('#formularioPrincipal').css({backgroundImage:"url(https://miro.medium.com/max/888/1*YGCqKYYjb1wJgeqXx-2mjA.gif)"}).fadeIn(1000)
                })
                
                $('.regresar').on("click", function(){
                
                    $('.resultado').fadeOut("slow",function(){
                        $('.resultado').remove()
                        $('.contenido').fadeIn(2000)
                        $('#formularioPrincipal').css({backgroundImage:"none"}).delay(1000) 
                    })

                })

                // Enter
                $("body").keypress(function(event){
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if(keycode == '13'){
                        $(".regresar").trigger('click')   
                    }
                });

                // ClickMe
                const buttonEl = document.querySelector('#clickMe');
                    buttonEl.addEventListener('click', runAJAX);

                    function runAJAX() {
                        alert("Que tengas un buen día");
                    }
                
                // ocultar
                function myFunction() {
                    var x = document.getElementById("myDIV");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } else {
                        x.style.display = "none";
                    }
                }

                function agregarHistorial(capital,plazo,tasa,interes,montoFinal){
                    const datos= {capital, plazo, tasa, interes, montoFinal}
                    historialInversiones.push(datos);
                }    
                agregarHistorial(capital,plazo,tasa,interes,montoFinal)
                
                
                const historialInversionesJson= JSON.stringify(historialInversiones)
                sessionStorage.setItem('Calculos de inversiones', historialInversionesJson)       

                function enviarDatosApi() {
                    let Inversiones = {
                        "userId": 1,
                        "id": 101,
                        "title": "Inversiones",
                        "body": historialInversiones
                    }
                
                    $.post("https://jsonplaceholder.typicode.com/posts", Inversiones).done(function(respuesta, estado) {
                        console.log("Estado: " + estado);
                        console.log("Datos de la API: " + JSON.stringify(respuesta));
                        console.log(respuesta);
                    });
                }
                
                enviarDatosApi();
            }
        }
    })
})
