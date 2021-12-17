<?php require "db.php" ?>

<?php require "templates/head.html" ?>
<?php
$id = $_GET['id'];

$items = $connection->prepare("SELECT * FROM screenshots WHERE id=?");
$items->execute([$id]);

$items = $items->fetchAll();
$user_id = $items[0]['user_id'];

$owner = $connection->prepare("SELECT * FROM users WHERE id=?");
$owner->execute([$user_id]);
$owner = $owner->fetchAll();
$items = $connection->prepare("SELECT * FROM screenshots WHERE id=?");
$items->execute([$id]);

// for ($a = 0; $a < 20; $a++){
//     echo (uniqid());
//     echo "\n";
// }
?>

<head>
    <link rel="stylesheet" href="css/screenshot.css">
</head>

<body>
    <?php require "templates/forms.html" ?>
    <?php require "templates/header.html" ?>
    <main class="main">
        <div class="main-wrapper">
            <?php foreach ($items as $item) : ?>
                <div class="screenshot-block">
                    <div class="screenshot-block__image-container">
                        <img src="screenshots-image/<?= $item['img'] ?>" class="screenshot-block__image"></img>
                    </div>
                    <div class="screenshot-block-info">
                        <div class="screenshot-block-info__date">Дата загрузки:<br><?= $item['date'] ?></div>
                        <div class="screenshot-block-info__owner">Владелец:<br><?= $owner[0]['name'] ?></div>
                    </div>
                    <button id="download_button" class="screenshot-block__download-button">Скачать</button>
                </div>
            <?php endforeach; ?>
        </div>
    </main>
    <?php require "templates/footer.html" ?>
    <script src="js/forms.js"></script>
</body>

</html>