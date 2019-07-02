var move = true;
var forward_ = 4;
function window(width,height,text,onClick){
  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable(){
    run:function(){
      try{
        var floatball=new android.widget.PopupWindow();
        floatball.setWidth(width);
        floatball.setHeight(height);
        var _btn=new android.widget.Button(ctx);
        _btn.setText(text);
        floatball.setContentView(_btn);
        _btn.setOnClickListener(new android.view.View.OnClickListener(){
          onClick:function(v){
            try{
              onClick(v);
            }catch(e){
              print(e);
            }
          }
        });
        var offsetX=0;
        var offsetY=0;
        var _x=0;
        var _y=0;
        var screen_width=ctx.getWindowManager().getDefaultDisplay().getWidth();
        var screen_height=ctx.getWindowManager().getDefaultDisplay().getHeight();
        _btn.setOnTouchListener(new android.view.View.OnTouchListener(){
          onTouch:function(v,e){
            if(move){
                switch(e.getAction()){
              case 0:
                offsetX=e.getX();
                offsetY=e.getY();
              break;
              case 2:
                _x+=(e.getX()-offsetX)/2;
                _y+=(e.getY()-offsetY)/2;
                _x=Math.min(screen_width/2-width/2,_x)
                _x=Math.max(-screen_width/2+width/2,_x)
                _y=Math.min(screen_height/2-height/2,_y)
                _y=Math.max(-screen_height/2+height/2,_y)
                floatball.update(_x,_y,-1,-1);
              break;
              case 1:
              break
            }
            }
            return false;
            return true;
          }
        });
        floatball.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.CENTER,0,0);
      }catch(err){
        print(err);
      }
    }
  });
}

function getServer(){
    clientMessage("Server got:" + Server.getAddress + ":" + Server.getPort());
}
function forward(n){
    var xaw = (getYaw() % 360) * Math.PI / 180;
    xv=-Math.sin(xaw) * n;
    zv=Math.cos(xaw) * n;
    Entity.setPosition(getPlayerEnt(),getPlayerX() + xv,getPlayerY(),getPlayerZ() + zv)
}

var tp = false;
function useItem(x, y, z, id, id2, side){
    if(tp){
        setPosition(getPlayerEnt(),x,y+3,z);
    }
}
//Long Jump
window(200,200,"LJ",function(){
    var xaw = (getYaw() % 360) * Math.PI / 180;
    xv=-Math.sin(xaw)
    zv=Math.cos(xaw)
    setVelX(getPlayerEnt(),xv);
    setVelY(getPlayerEnt(),0.5);
    setVelZ(getPlayerEnt(),zv);
});
//DigSpeed
window(200,200,"DS",function(){
    Entity.addEffect(getPlayerEnt(),MobEffect.digSpeed,20 * 10000,50,false,false);
});
//Move Forward
window(200,200,"FW",function(){
    forward(4);
});
//Move up
window(200,200,"UP",function(){
    Entity.setPosition(getPlayerEnt(),getPlayerX(),getPlayerY() + 10,getPlayerZ());
});
//Move down
window(200,200,"DN",function(){
    Entity.setPosition(getPlayerEnt(),getPlayerX(),getPlayerY() - 10,getPlayerZ());
})
//Air Jump
window(200,200,"JP",function(){
    setVelY(getPlayerEnt(), 0.8);
});
//Tap Teleport
/*window(200,200,"TP",function(){
    if(tp){
        clientMessage("Tap Tp off");
        tp = false;
    }else{
        clientMessage("Tap Tp on");
        tp = true;
    }
});*/

function newLevel(){
    print("Cairor Hack, Powered by CAIMEO.");
}

window(200,200,"LK",function(){
    if(move){
        move = false;
        clientMessage("GUI Locked!");
    }else{
        move = true;
        clientMessage("GUI Unlocked!")
    }
});
