(function () {
    var itemCheck = document.querySelectorAll('.item__check');
    var addItemInput = document.querySelector('.add-item__input')
    var addItemForm = document.querySelector('.add-item');
    var itemsList = document.querySelector('.items');

    var getClosest = function ( elem, selector ) {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }

        // Get closest match
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }

        return null;

    };
    function checked(element) {
        if (element.checked){
            getClosest(element, '.item').classList.add('active');
        } else {
            getClosest(element, '.item').classList.remove('active');
        }
    }
    function createElement(title){
        var item = document.createElement('li');
        item.classList.add('item');

        var itemInfo = document.createElement('span');
        itemInfo.classList.add('item__info');

        var itemButtons = document.createElement('span');
        itemButtons.classList.add('item__buttons');

        var itemCheck = document.createElement('input');
        itemCheck.setAttribute('type', 'checkbox');
        itemCheck.classList.add('item__check');

        var itemTitle = document.createElement('lable');
        itemTitle.classList.add('item__title');
        itemTitle.innerText = title;

        var itemInput = document.createElement('input');
        itemInput.classList.add('item__input');
        item.setAttribute('type', 'text');

        var itemEdit = document.createElement('button');
        itemEdit.classList.add('item__button', 'item__edit', 'button');
        itemEdit.innerText = 'edit';

        var itemDel = document.createElement('button');
        itemDel.classList.add('item__button', 'item__del', 'button');
        itemDel.innerText = 'delete';

        itemInfo.appendChild(itemCheck);
        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemInput);
        itemButtons.appendChild(itemEdit);
        itemButtons.appendChild(itemDel);
        item.appendChild(itemInfo);
        item.appendChild(itemButtons);

        itemsList.appendChild(item);
    }
    function edit(element){
        var itemInfo = element.parentNode.parentNode.querySelector('.item__info');
        var input = element.parentNode.parentNode.querySelector('.item__input');
        var title = element.parentNode.parentNode.querySelector('.item__title');

        itemInfo.classList.toggle('show');
        if (itemInfo.classList.contains('show')){
            input.value = title.innerText;
        } else {
            title.innerText = input.value;
        }
    }

    function del(element){
        var elementForDel = element.parentNode.parentNode;
        console.log(elementForDel);
        itemsList.removeChild(elementForDel);
    }

    addItemForm.addEventListener('submit', function (e) {
       e.preventDefault();
       var title = addItemInput.value;
       if (title === ''){
           alert('add new task');
       } else {
           createElement(title);
       }

    });

    itemsList.addEventListener('click', function (e) {
        var target = e.target || e.srcElement;

        if (target.classList.contains('item__check')){
            checked(target);
        }
        if (target.classList.contains('item__edit')){
            edit(target);
        }
        if (target.classList.contains('item__del')){
            console.log(target)
            del(target);
        }
    })
    // add item in list


})();