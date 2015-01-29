function Deck(properties) {
    this.deckId = properties.deckId;
    this.image = properties.image;
    this.title = properties.title;
    this.cards = properties.cards;
}

module.exports = [
    new Deck({
        deckId: 'mono',
        title: 'もの',
        image: 'img/Apple.svg',
        cards: [
            ['りんご'],
            ['コーヒー'],
            ['おちゃ'],
            ['ソーセージ'],
            ['はな']
        ]
    }),
    new Deck({
        deckId: 'tekunorojii',
        title: 'テクノロジー',
        image: 'img/Gameboy.svg',
        cards: [
            ['ゲイム'],
            ['コンピュータ'],
            ['ウェブ'],
            ['ブラウザ'],
            ['モジラ ファイアフォックス']
        ]
    }),
    new Deck({
        deckId: 'keiyoushi',
        title: 'けいようし',
        image: 'img/Heart.svg',
        cards: [
            ['img/keiyoushi/1.jpg', 'いきます'],
            ['img/keiyoushi/2.jpg', 'おきます'],
            ['img/keiyoushi/3.jpg', 'たべます'],
            ['img/keiyoushi/4.jpg', 'のみます'],
            ['img/keiyoushi/5.jpg', 'ねます'],
            ['img/keiyoushi/6.jpg', 'ねます'],
            ['img/keiyoushi/7.jpg', 'ねます'],
            ['img/keiyoushi/8.jpg', 'ねます']
        ]
    }),
    new Deck({
        deckId: 'doushi',
        title: 'どうし',
        image: 'img/running.gif',
        cards: [
            ['いきます'],
            ['おきます'],
            ['たべます'],
            ['のみます'],
            ['ねます']
        ]
    })
];
