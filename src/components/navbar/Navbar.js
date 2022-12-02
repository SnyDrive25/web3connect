function Navbar() {
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e.preventDefault();
      }
      
    function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
        }
    }
    
    var supportsPassive = false;
    try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
    } catch(e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;

    function open() {
        document.getElementById("hamburger").style.display = "none";
        document.getElementById("Navbar").style.position = "fixed";
        document.getElementById("Navbar").style.width = "100vw";
        document.getElementById("Navbar").style.height = "100vh";
        window.addEventListener('touchmove', preventDefault, wheelOpt);
        document.body.style.overflowY = "hidden!important";
        document.getElementById("all_titles").style.opacity = "1";
        document.getElementById("all_titles").style.pointerEvents = "all";
        console.log("done");
    }

    return (
        <div id="Navbar">
            <img src="/hamburger.png" id="hamburger" onClick={open}></img>
            <div id="all_titles">
                <div className="titles"><a href="/">Home</a></div>
                <div className="titles"><a href="/chain_info">Chain Info</a></div>
                <div className="titles"><a href="/bayc">BAYC</a></div>
                <div className="titles"><a href="/nefturians">Nefturians</a></div>
                <div className="titles"><a href="/meebits">Meebits</a></div>
                <div className="titles"><a href="/meebits_claimer">Meebits Claimer</a></div>
            </div>
        </div>
    )
}

export default Navbar;