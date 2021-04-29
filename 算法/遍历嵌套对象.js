let obj = {
    x: 10,
    y: 20,
    children: [
        {
            x: 1,
            y: 2,
            children: [
                {
                    x: 3,
                    y: 4
                }
            ]
        },
        {
            x: 5,
            y: 6
        }
    ]
}

// 如何遍历obj？

function traverse(obj) {

    if (obj) {
        console.log("--------begin-------")
        console.log("x:", obj.x);
        console.log("y:", obj.y);
        console.log("--------end-------")

        if (obj.children) {
            obj.children.forEach(element => {
                traverse(element);
            });
        }
    }
}
