const { createApp, ref } = Vue

createApp({
    data() {
        return {
            lists: [
                {
                    children: [
                        {
                            checked: false,
                            number: Math.floor(Math.random() * 30) + 10,
                            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
                        },
                        {
                            checked: false,
                            number: Math.floor(Math.random() * 30) + 10,
                            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
                        },
                        {
                            checked: false,
                            number: Math.floor(Math.random() * 30) + 10,
                            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
                        }
                    ],
                    checked: false,
                    show: false,
                    cubes: [],
                    showCubes: false
                },
            ]
        }
    },

    methods: {
        toggleCheckbox(list) {
            list.show = !list.show;
        },

        showBlocks(list) {
            list.checked = !list.checked;
        },

        showChildren(list) {
            const allChecked = list.children.every(item => item.checked === true);

            list.children.forEach(item => {
                item.checked = !allChecked;
            });
        },

        changeSorting(list,shuffle = true) {
            list.cubes = [];
            list.children.forEach((item, index) => {
                for (let i = 0; i < item.number; i++) {
                    if (item.checked) list.cubes.push({color: item.color,index: index});
                }
            });

            if (shuffle) {
                list.cubes = this.shuffleArray(list.cubes);
                list.showCubes = !list.showCubes;
            } 

            console.log(list);
        },

        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },

        anyChildrenIsChecked(list) {
            return list.children.some(child => child.checked === true);
        },

        reduce(element,index,type = 'normal',key = 0) {
            element.children[index].number -= 1;
            if(type === 'random') {
                element.cubes.splice(key,1);
            }
        },
    }
}).mount('#assignment')