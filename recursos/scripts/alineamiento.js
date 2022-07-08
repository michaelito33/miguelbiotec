var boton = document.getElementById("boton");
function alinear(){
    var seq1 = document.getElementById("sec1").value;
    var seq2  = document.getElementById("sec2").value;
    var match = Number(document.getElementById("match").value);
    var missmatch = Number(document.getElementById("missmatch").value);
    var gap = Number(document.getElementById("gap").value);
    var m = [];
    for (let l=0;l<=seq1.length;l++){
        m.push([]);
    }
    for (let i = 0; i<=seq1.length;i++){
        for(let j = 0; j<=seq2.length;j++){
            m[i][j]=0;
        }
    }
    for (let i = 1; i<=seq1.length;i++){
        m[i][0]=m[i-1][0]+gap;
    }
    for (let i = 1; i<=seq2.length;i++){
        m[0][i]=m[0][i-1]+gap;
    }
    for (let i = 1; i<=seq1.length;i++){
        for(let j = 1; j<=seq2.length;j++){
            let d;
            if (seq1[i-1]===seq2[j-1]){
                d=m[i-1][j-1]+match;
            }else{
                d=m[i-1][j-1]+missmatch;
            }
            let h = m[i-1][j]+gap;
            let v = m[i][j-1]+gap;
            m[i][j]=Math.max(d,h,v);
        }
    }
    let sec1 = "";
    let sec2 = "";
    let i = seq1.length;
    let j = seq2.length;
    while(i!==0 || j!== 0){
        if (seq1[i-1]===seq2[j-1] && m[i][j]===m[i-1][j-1]+match){
            sec1 = seq1[i-1]+sec1;
            sec2 = seq2[j-1]+sec2;
            i--;
            j--;
        }else if (seq1[i-1]!==seq2[j-1] && m[i][j]===m[i-1][j-1]+missmatch){
            sec1 = seq1[i-1]+sec1;
            sec2 = seq2[j-1]+sec2;
            i--;
            j--;
        }else if(m[i][j]===m[i-1][j]+gap){
            sec1=seq1[i-1]+sec1;
            sec2="-"+sec2;
            i--;
        }else if(m[i][j]===m[i-1][j]+gap){
            sec1=seq1[i-1]+sec1;
            sec2="-"+sec2;
            i--;
        }else if(m[i][j]===m[i-1][j]+gap){
            sec1=seq1[i-1]+sec1;
            sec2="-"+sec2;
            i--;
        }else if(m[i][j]===m[i][j-1]+gap){
            sec2=seq2[j-1]+sec2;
            sec1="-"+sec1;
            j--;
        }
    }
    window.document.write(`<div style="background-color: #e7eaf2; margin: 0px;padding: 5px;">
    <header>
        <h1 style="margin-left: 2px;">Alineamiento</h1>
    </header style="background-color:white; padding:5px;">
    <div style="background-color: white;padding: 5px;word-wrap:break-word">
        <p style="font-family:'Courier New', Courier, monospace;">${sec1}</p>
        <p style="font-family:'Courier New', Courier, monospace;">${sec2}</p>
    </div>
</div>`);
}
boton.addEventListener("click",alinear);