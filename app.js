
function getRandomValue(min,max){
return Math.random()*(max-min) + min;
}
const app = Vue.createApp({
data(){
    return{
        playerHealth:100,
        monsterHealth:100,
        currentRound:0,
        winner:null,
        bLogs:[],
        status:"https://static.wikia.nocookie.net/bokunoheroacademia/images/1/1b/All_Might_vs_All_For_One.gif/revision/latest/scale-to-width-down/340?cb=20180610215515"

    };
},
methods:{
    startGame(){
        this.playerHealth=100,
        this.monsterHealth=100,
        this.currentRound=0,
        this.winner=null,
        this.bLogs=[],
        this.status =" https://static.wikia.nocookie.net/bokunoheroacademia/images/1/1b/All_Might_vs_All_For_One.gif/revision/latest/scale-to-width-down/340?cb=20180610215515"
    },
    attackMonster(){
        const attackVal= getRandomValue(5,12);
        this.monsterHealth -=attackVal;
        this.addLogMessage('Hero','Attacked',attackVal);
        this.attackPlayer();
        this.currentRound++;
        this.status="https://thumbs.gfycat.com/ElaborateVioletAfricanbushviper-max-1mb.gif"
    },
    attackPlayer(){
        const damageVal = getRandomValue(8,15);
        this.addLogMessage('Monster','Attacked',damageVal);
        this.playerHealth -= damageVal;
    },
    specialAttackMonster(){
        const specVal =getRandomValue(10,25);
        this.monsterHealth -=  specVal;
        this.addLogMessage('Hero','Special Attacked!',specVal);
        this.attackPlayer();
        this.currentRound++;
        this.status ="https://media1.tenor.com/images/0ee9d9bd3667cb5de5f79bb224e2bf4f/tenor.gif?itemid=12014967"
    },
    healPlayer(){
        this.currentRound++;
        const healVal= getRandomValue(15,22);
        if(this.playerHealth +  healVal > 100){
            this.playerHealth = 100;
        }else{
            this.playerHealth +=  healVal;
        }
        this.addLogMessage('Hero','Heal',healVal);
        this.attackPlayer();
        this.status="https://pa1.narvii.com/6306/4d721ae6377532d7a1e62aef0b57ef4241b8fa86_hq.gif"
    },
    surrender(){
        this.winner="defeat"
        this.status="https://i.ytimg.com/vi/EhR-jf3r-SM/maxresdefault.jpg"
    },
    addLogMessage(who,what,value){
        this.bLogs.unshift({
            actionBy:who,
            actionType:what,
            actionValue:value
        });
    }
},
computed:{
    monsterBarStyles(){
        if(this.monsterHealth<0){
            return{width:'0%'};
        }
        return{width: this.monsterHealth + '%'};
    },
    playerBarStyles(){
        if(this.playerHealth<0){
            return{width:'0%'};
        }
        return{width: this.playerHealth + '%'};
    },
    playerSpecialAttack(){
        {return this.currentRound % 3 !==0}
    },
    gameOver(){
        return this.winner!=null;
    }
},
watch:{
    playerHealth(value){
        if (value<=0 && this.monsterHealth <=0){
            //draw
            this.winner="draw"

            
        }
        else if (value<=0 ) {
            //defeat
            this.winner="defeat"
            this.status="https://i.pinimg.com/originals/64/04/5d/64045dde6d3a58a41cb8ef9f658540b3.png"
            
        } 
    },
    monsterHealth(value){
        if(value<=0 && this.playerHealth <=0){
            //draw
            this.winner="draw"
        }
        else if(value<=0 ){
             //win
             this.winner="win"
             this.status="https://thumbs.gfycat.com/NastyMediumArmednylonshrimp-size_restricted.gif"

        }
           

    }
}

});


app.mount('#game');