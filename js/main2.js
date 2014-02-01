var Level = 1,
    Repeticoes = 1,
    state = 'start',
    array_seq_boot = [0, 3, 4, 2, 7],
    index_seq_boot = 0;

var busy = false;

Teste1();

var $blocos = $('#grid-button > li');

function Teste1(){


    var interval = setInterval(function(){

        console.log(state);

        if (!busy)
        {

            switch(state)
            {
                case 'start':

                    busy = true;

                    setTimeout(function(){
                        state = 'doing';
                        busy = false;
                    }, 5000);

                break;
                case 'doing':

                    busy = true;

                    console.log('index : ' +index_seq_boot);

                    if ( index_seq_boot <= array_seq_boot.length )
                    {

                        console.log($blocos.length);
                        setTimeout( function(){
                            AnimeItem($('#grid-button > li:nth-child(' + array_seq_boot[index_seq_boot] + ') a'));
                        }, 300);

                        index_seq_boot++;

                        busy = false;
                    }else{
                        state = 'done';
                        busy = false;
                    }

                break;
                case 'done':
                    clearInterval(interval);
                break;

            }
        }

    }, 1000);

}

function


function AnimeItem($item){
    $item.addClass('show');

    setTimeout( function(){
        $item.removeClass('show');
    },300);
}

