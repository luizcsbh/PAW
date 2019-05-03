$(document).ready(
    function(){
       if((n=localStorage.getItem('n'));
       if( n == null)
        let n = 1;
        $('p')
            .each(function(){
                    this.innerHTML = n++;
            });
        localStorage.setItem('n',n);
    }
);

$('button').click(function(){
    localStorage.clear();
})