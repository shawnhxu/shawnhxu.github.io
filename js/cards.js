/* Project cards: click the front to turn a card over, "Back" or Esc to
   turn it back. All of the animation lives in CSS — this file only
   tracks which side is up and keeps the hidden side out of reach of the
   keyboard and screen readers. */

document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.card');

    function setFlipped(card, flipped) {
        var front = card.querySelector('.card-front');
        var back = card.querySelector('.card-back');
        var toggle = card.querySelector('.card-toggle');

        card.classList.toggle('is-flipped', flipped);
        toggle.setAttribute('aria-expanded', String(flipped));

        // The face turned away is invisible, so nothing in it should be
        // tabbable or announced.
        front.inert = flipped;
        back.inert = !flipped;
    }

    cards.forEach(function (card) {
        setFlipped(card, false);

        card.querySelector('.card-toggle').addEventListener('click', function () {
            setFlipped(card, true);
            // Send focus to the face that just came up.
            card.querySelector('.card-close').focus();
        });

        card.querySelector('.card-close').addEventListener('click', function () {
            setFlipped(card, false);
            card.querySelector('.card-toggle').focus();
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') { return; }
        document.querySelectorAll('.card.is-flipped').forEach(function (card) {
            setFlipped(card, false);
        });
    });

    // A deep link — projects.html#starcraft — opens that card face up.
    if (location.hash.length > 1) {
        var target = null;
        try {
            target = document.querySelector(location.hash);
        } catch (error) {
            target = null;  // hash isn't a usable selector; nothing to open
        }
        if (target && target.classList.contains('card')) {
            setFlipped(target, true);
        }
    }
});
