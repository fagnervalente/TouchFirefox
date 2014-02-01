var array_seq_boot = [],
    array_seq_user = [];

var level = 0;

$('html').css('height', $(window).width());

var state = 'NewLevel';
var busy_global = busy_boot = false;

var index_play_boot = 0;

$(function(){

    $("#new-game").click(function(){

        ShowMessage("O desafio começou!");

        setTimeout( NewGame, 1000);

    });

    $("#end-game").click(function(){

        state = 'EndGame';
        alert('Jogo Abortado');

    });

    $('#Sair').click(function(){

        window.close();

    });

    $('#grid-button a').click(onClickPlayer);

});

function NewGame(){

    array_seq_boot = [];
    array_seq_user = [];
    level = 0;
    index_play_boot = 0;

    $('#fase').html('Level ' + (level + 1));

    state = 'NewLevel';



    var intervalGlobal = setInterval(function(){

        if (!busy_global)
        {

            //console.log('state :' + state);

            switch(state){

                case 'NewLevel':

                    busy_global = true;

                    NewLevel();

                    state = 'PlayBoot';
                    busy_global = false;

                break;

                case 'PlayBoot':

                    busy_global = true;

                    PlayBoot();

                break;

                case 'PlayPlayer':

                break;

                case 'GameOver':

                    array_seq_boot = [];
                    array_seq_user = [];
                    array_fase = [];
                    level = 1;
                    index_play_boot = 0;

                    $('#fase').html('');

                    ShowMessageGameOver("Game Over ;(");

                    setTimeout(function(){ state = 'EndGame'; }, 2000);

                break;
                case 'EndGame':

                    clearInterval(intervalGlobal);

                break;


            }

        }

    }, 100);

}

function EndGame(){

    array_seq_boot = [];
    array_seq_user = [];
    array_fase = [];
    level = 1;
    index_play_boot = 0;

}

function onClickPlayer(){

    var index_toutch_user = $(this).closest('li').index();

    array_seq_user.push( index_toutch_user );

    AnimeItem($(this));

    //console.log( 'array_seq_boot[array_seq_user.length - 1] : ' + array_seq_boot[array_seq_user.length - 1] + ' | ' + 'index_toutch_user : ' + index_toutch_user);

    if ( array_seq_user.length <= array_seq_boot.length && array_seq_boot[array_seq_user.length - 1] == index_toutch_user )
    {

        if (  array_seq_user.length == array_seq_boot.length ) //Completou a fase
        {

            state = 'NewLevel';

        }

        console.log('ok - index:' + index_toutch_user);
    }
    else //Game Over
    {
        console.log('ERRO - index:' + index_toutch_user);
        state = 'GameOver';
    }

}



function NewLevel(){

    level++;

    $('#fase').html('Level ' + level );
    array_seq_user = [];

    //Gera uma coordenada aleátória e adiciona no desafio
    array_seq_boot.push(  parseInt( getRandomArbitary(0,8) ) );
}

var PlayBoot = function(){

    var jogada_boot = setInterval(function(){

        //console.log('array_seq_boot.length : ' + array_seq_boot.length);

        if ( index_play_boot <= array_seq_boot.length -1 )
        {

            console.log( 'index_play_boot: ' + index_play_boot + ' | position : ' + array_seq_boot[index_play_boot] );

            AnimeItem( $('#grid-button > li:nth-child(' + (array_seq_boot[index_play_boot] + 1) + ') > a') );

            index_play_boot++;
        }
        else{

            clearInterval(jogada_boot);

            index_play_boot = 0;

            busy_global = false;

            state = 'PlayPlayer';
        }

    }, 1000);

};

function AnimeItem($item){
    $item.addClass('show');

    setTimeout( function(){
        $item.removeClass('show');
        //console.log('Class atual :' + $item.attr('class'));

    },300);
}

function ShowMessage(message){

    $('#message').html('<label>' + message + '</label>');
    $('#message').addClass('show-message');
    setTimeout(function(){
        $('#message').removeClass('show-message');
    }, 2000);

}

function ShowMessageGameOver(message){

    $('#message').html('<label>' + message + '</label>');
    $('#message').addClass('show-message message-gameover');
    setTimeout(function(){
        $('#message').removeClass('show-message message-gameover');
    }, 2000);

};


function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/*function compute()
{

  var move = null;

  var busy = false, task = 'init';

  var processor = setInterval(function()
  {

    if(!busy)
    {

      switch(task)
      {

        case 'start-game':
            alert('O jogo começou! :)');

            task = 'doit-boot';
            busy = true;

        break;
        case 'doit-boot' :

            //move = PlayBoot();

          if(move)
            task = 'doit-play';
          else
            task = 'done';

        break;
        case 'doit-play':

            if ( game_over )
            {

                alert('Você perdeu... :(');
                task = 'final';
                busy = false;

            }else if ( winner ){

                alert('Você venceu! :)');
                task = 'final';
                busy = false;

            }

        break;
        case 'final' :

            clearInterval(processor);
            busy = false;

        break;

      }

    }



  }, 100);

*/