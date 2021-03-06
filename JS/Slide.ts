class Slide
{
    private target : JQuery;

    constructor(target: string)
    {
        this.target = $(target);

        this.Update();

        this.ApplyStyles();

        $(window).resize(() => {this.Update();});
    }

    public Update() : void
    {
        // Correction bug chelou de margin pas correcte
        let self : Slide = this;
        let iMargin : string  = this.target.find("li:first").css("margin-left"); // sauvegarde du margin pour restauration
        this.target.find("li").each((index, e) => {
                $(this).remove();
                $(this).css("margin-left", iMargin);
                self.target.find("li:last").after(e); 
        });

        let childs : number = this.target.find("ul li").length;
        let size : number = this.target.find("ul li").width();
        let margin : number = parseInt(this.target.find("ul li").css("margin-left").replace("px", ""));
        let position : number = 0;

        size = size + margin * 1;

        // Récupération du centre de l'écran
        position = Math.round($(window).width() / 2);
        position -= Math.round((childs*size) / 2);

        //position -= 15; // WTF ? Sans ça c'est pas centré

        this.target.css("margin-left", position);
    }

    private ApplyStyles() : void
    {
        // Application des styles

        this.target.find("li").removeClass("focus");
        this.target.find("li").addClass("dark");

        let number : number = this.target.find("li").length;
        $(this.target.find("li").get(Math.floor(number/2))).removeClass("dark");
        $(this.target.find("li").get(Math.floor(number/2))).addClass("focus");


    }

    public Next() : void
    {
        let self: Slide = this;
        let first : JQuery = this.target.find("li:first");
        let iMargin : string  = first.css("margin-left"); // sauvegarde du margin pour restauration
        
        first.animate(
            {
                "margin-left" : -first.width() 
            }, 100, "swing", function()
            {
                $(this).remove();
                $(this).css("margin-left", iMargin);
                self.target.find("li:last").after($(this)); 
                self.ApplyStyles();
                
        });
    }

    public Previous() :  void
    {
        let self : Slide = this;
        let last : JQuery = this.target.find("li:last");
        let iMargin : string = last.css("margin-left");

        last.css("margin-left", -last.width());
        this.target.find("li:first").before(last);
        last.animate(
            {
                "margin-left" : iMargin
            }, 100, "swing",function()
            {
                self.ApplyStyles();
            }
        )
    }
}