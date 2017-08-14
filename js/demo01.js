/**
 * Created by Administrator on 2016/11/29.
 */


//必须在服务器上才能看到效果！
window.onload=function(){
    getTitleHeight();
    loadingAllImg('images/25_5.jpg');
    bindEvents();
}
//让全景图刚好撑满屏幕
var canvasHeight;
function getTitleHeight(){
    var title=document.getElementById('title');
    var titleHeight=parseFloat(getComputedStyle(title).height);
    var maxHeight=window.innerHeight;
    canvasHeight=parseFloat(maxHeight-titleHeight)+'px';
}
//全景图参数配置函数
function loadingAllImg(src){
    var div = document.getElementById('container');
    var PSV = new PhotoSphereViewer({
        // 全景图的完整路径
        panorama: src,

        // 放全景图的元素
        container: div,

        // 可选，默认值为2000，全景图在time_anim毫秒后会自动进行动画。（设置为false禁用它）
        time_anim: false,

        // 可选值，默认为false。显示导航条。
        // navbar: true,

        // 可选，默认值null，全景图容器的最终尺寸。例如：{width: 500, height: 300}。
        size: {
            width: '100%',
            height: canvasHeight
        }
    });
}
// 小pano模板
function insertShow(showPanoSrc) {
    var showPanoTempalte = `
    <div class="show-pano">
        <img class="show-pano-img" src=${showPanoSrc} data-src=${showPanoSrc} alt="">
        <img class="show-pano-delete" src="images/icon/delete.png" alt="">
    </div>
    `
    return showPanoTempalte
}
// 提交表单数据
function serForm($form){
    var fadeIn =[];
    fadeIn.push($form.querySelectorAll('input[type="text"]')[0]);
    fadeIn.push($form.querySelectorAll('input[type="text"]')[1]);
    fadeIn.push($form.querySelector('textarea'));
    fadeIn.push($form.querySelector('input[type="hidden"]'));
    console.log(fadeIn[0].getAttribute("name"))
    var result =[];
    for(var i=0;i<fadeIn.length;i++){
        var key = fadeIn[i].getAttribute("name")
        var value = fadeIn[i].value
        result.push({
            [key] : value
        });
    }
    return result;
}

function bindEvents() {

    // 右侧小图标


    // 二层小图标
    document.querySelector('.edit-sign').addEventListener('click', function (event) {
        var secondLevel = document.querySelector('.second-level')
        if (secondLevel.classList.contains('hide')) {
            secondLevel.classList.remove('hide')
        } else {
            secondLevel.classList.add('hide')
        }
    })
    var levelImgs = document.querySelectorAll('.second-level-img')
    var eventName
    for (var i = 0; i < levelImgs.length; i++) {
        levelImgs[i].addEventListener('click', function (events) {
            document.body.style.cursor = event.target.dataset.src
            eventName = event.target.dataset.name
            document.querySelector('body').addEventListener('dblclick', function (events) {
                document.body.style.cursor = ''
                if (eventName == 'text') {
                    document.querySelector('.text-sign').classList.add('show')
                }
                if (eventName == 'file') {
                    document.querySelector('.file-sign').classList.add('show')
                }
                if (eventName == 'image') {
                    document.querySelector('.image-sign').classList.add('show')
                }
            })
        })
    }
    document.querySelector('.text-sign-off').addEventListener('click', function () {
        document.querySelector('.text-sign').classList.remove('show')
    })
    document.querySelector('.text-sign-cancel').addEventListener('click', function () {
        document.querySelector('.text-sign').classList.remove('show')
    })
    document.querySelector('.file-sign-off').addEventListener('click', function () {
        document.querySelector('.file-sign').classList.remove('show')
    })
    document.querySelector('.file-sign-cancel').addEventListener('click', function () {
        document.querySelector('.file-sign').classList.remove('show')
    })
    document.querySelector('.image-sign-off').addEventListener('click', function () {
        document.querySelector('.image-sign').classList.remove('show')
    })
    document.querySelector('.image-sign-cancel').addEventListener('click', function () {
        document.querySelector('.image-sign').classList.remove('show')
    })

    document.querySelector('.edit-swith').addEventListener('click', function () {
        document.body.style.cursor = ''
    })
    // 底部编辑
    document.querySelector('.add-map').addEventListener('click', function (event) {
        var fadeIn = document.querySelector('.fade-in')
        if (fadeIn.classList.contains('show')) {
            fadeIn.classList.remove('show')
        } else {
            fadeIn.classList.add('show')
        }
    })
    document.querySelector('.fade-bt3').addEventListener('click', function (event) {
        var fadeIn = document.querySelector('.fade-in')
        fadeIn.classList.remove('show')
    })

    // 切换 删除全景图
    document.querySelector('.pano-bottom').addEventListener('click', function (events) {
        var showPanoImg = event.target
        if (showPanoImg.classList.contains('show-pano-img')) {
            var src = showPanoImg.dataset.src
            loadingAllImg(src);
        }
        if (showPanoImg.classList.contains('show-pano-delete')) {
            showPanoImg.parentElement.remove()
        }
    })

    // 增加场景
    document.querySelector('.fade-bt1').addEventListener('change', function (events) {
        var name = event.target.files[0].name;
        document.querySelector('input[type="hidden"]').value= 'images/' + name
    })
    document.querySelector('.fade-bt2').addEventListener('click', function () {
        var fadeIn = document.querySelector('.fade-in')
        fadeIn.classList.remove('show')
        var showPanos = document.querySelectorAll('.show-pano')
        var showPanoImgSrc = serForm(fadeIn)[3].sceneImg
        var template = insertShow(showPanoImgSrc)
        showPanos[showPanos.length - 1].insertAdjacentHTML('afterEnd', template)

    })
}
// var geometry = new THREE.PlaneGeometry(10,10);//矩形平面
// var texture = THREE.ImageUtils.loadTexture("../images/icon/img.jpg");//加载纹理贴图
// var material=new THREE.MeshLambertMaterial({//贴图通过材质添加给几何体
//     map:texture,//给纹理属性map赋值
//     side:THREE.DoubleSide,//两面可见
// });//材质对象
// var mesh = new THREE.Mesh(geometry,material);//纹理贴图网格模型对象
// scene.add(mesh);//网格模型添加到场景中

