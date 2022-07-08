let boton = document.getElementById("boton");
function pcr(){
    let molde = document.getElementById("secuencia").value;
    let forward = document.getElementById("primerfw").value;
    let reversem =  document.getElementById("primerrv").value;
    let circular = document.getElementById("circular").checked;
    let numero = document.getElementById("numero").value;
    if (forward && reversem){
        const susituciones = {"A":"T","T":"A","G":"C","C":"G"};
    function upper(cadena){
        let resultado = "";
        const may = {"A":"A","T":"T","G":"G","C":"C","a":"A","t":"T","g":"G","c":"C","\n":""};
        for (let letra of cadena){
            resultado = resultado+may[letra];
        }
        return resultado;
    }
    if(circular){
        molde = molde + molde;
    }
    molde = upper(molde);
    forward = upper(forward);
    reversem = upper(reversem);
    let reverse="";
    for (let letra of reversem){
        reverse = susituciones[letra] + reverse;
    }
    let fw = [];
    let rv = [];
    for (let x = 0;x<molde.length-forward.length+1;x++){
        if(molde.substring(x,x+forward.length)===forward){
            fw.push(x);
        }
    }
    for (let x = 0;x<molde.length-reverse.length+1;x++){
        if(molde.substring(x,x+reverse.length)===reverse){
            rv.push(x+reverse.length);
        }
    }
    let productos = [];
    for (let ini of fw){
        for (let fin of rv){
            if(ini<fin){
                let bien = true;
                for (let init of fw){
                    if (init<fin && init>ini){
                        bien = false;
                        break
                    }
                }
                for (let finit of rv){
                    if (finit<fin && finit>ini){
                        bien = false;
                        break
                    }
                }
                if(bien){
                    productos.push(molde.substring(ini,fin));
                }
            }
        }
    }
    let pro = [];
    for (let prod of productos){
        let pres = true;
        for(let prod2 of pro){
            if (prod == prod2){
                pres = false;
                break
            }
        }
        if (pres){
            pro.push(prod);
        }
    }
    let fwc = {"A":0,"C":0,"T":0,"G":0};
    for (let letra of forward){
        fwc[letra]++;
    }
    let rvc = {"A":0,"C":0,"T":0,"G":0};
    for (let letra of reverse){
        rvc[letra]++;
    }
    let tm = (2*(fwc["A"]+fwc["T"])+4*(fwc["G"]+fwc["C"]))+(2*(rvc["A"]+rvc["T"])+4*(rvc["G"]+rvc["C"]));
    tm /= 2;
    let bandas = "<p style=\"word-wrap:break-word;\">";
    for (let banda of pro){
        let minutos = Math.round(banda.length*0.06)+5;
        let min;
        if (minutos<60){
            min=String(minutos)+"''"
        }else{
            min=String((minutos-(minutos%60))/60)+"'"+String(minutos%60)+"''";
        }
        bandas=bandas+`(${tm}ºC 15'';74ºC ${min}) - ${banda.length}pb<br>${banda}<br><br>`;
    }
    bandas=bandas+"<br><br></p>";
    numero+=1;
    let h2o = 2.12*numero;
    let buffer = 2*numero;
    let cebadores = 1.6*numero;
    let dNTPs = 0.8*numero;
    let MgCl2 = 0.8*numero;
    let Taq = 0.08*numero;
    window.document.write(`<div style="background-color: #e7eaf2; margin: 0px;padding: 5px;">
    <header>
        <h1 style="margin-left: 2px;">PCR</h1>
    </header style="background-color:white; padding:5px;">
    <div style="background-color: white;padding: 5px; font-size: 15px;">
        ${bandas}
        <table style="border: solid;">
            <tr>
                <td>Componente</td>
                <td>Cantidad ul</td>
            </tr>
            <tr>
                <td>H20</td>
                <td>${h2o}</td>
            </tr>
            <tr>
                <td>Buffer</td>
                <td>${buffer}</td>
            </tr>
            <tr>
                <td>Cebadores (X2)</td>
                <td>${cebadores}</td>
            </tr>
            <tr>
                <td>dNTPs</td>
                <td>${dNTPs}</td>
            </tr>
            <tr>
                <td>MgCl2</td>
                <td>${MgCl2}</td>
            </tr>
            <tr>
                <td>Taq</td>
                <td>${Taq}</td>
            </tr>
        </table>
    </div>
</div>`)
    }
}
boton.addEventListener("click",pcr);