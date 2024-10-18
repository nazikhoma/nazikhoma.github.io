let podcastPlaylist = [
    {
        title: "Як бути продуктивним кожен день",
        author: "Олександр Зубченко",
        duration: 25,
        topic: "Продуктивність",
        isListened: true
    },
    {
        title: "Секрети успішного стартапу",
        author: "Марія Петренко",
        duration: 45,
        topic: "Бізнес",
        isListened: false
    },
    {
        title: "Технології майбутнього: чого чекати?",
        author: "Іван Сидоренко",
        duration: 30,
        topic: "Технології",
        isListened: true
    },
    {
        title: "Як зберегти ментальне здоров'я",
        author: "Андрій Гончарук",
        duration: 50,
        topic: "Здоров'я",
        isListened: false
    },
    {
        title: "Чому мистецтво важливе для суспільства",
        author: "Ольга Коваленко",
        duration: 40,
        topic: "Мистецтво",
        isListened: true
    }
];

function displayPlaylist() {
    podcastPlaylist.forEach(podcast => {
        console.log(`Назва: ${podcast.title}, Автор: ${podcast.author}, Тривалість(в хвилинах): ${podcast.duration}, Тема: ${podcast.topic}, Прослухано: ${podcast.isListened ? "Так" : "Ні"}`)
    })
}
displayPlaylist()

podcastPlaylist.push({title: "Як створювати креативні ідеї", author: "Тетяна Кравченко", duration: 35, topic: "Мистецтво", listened: false})
displayPlaylist()

podcastPlaylist.sort((a, b) => a.duration - b.duration);
console.log("Відсортовані подкасти за тривалістю:", podcastPlaylist)

let unlistedPodcasts = podcastPlaylist.filter(podcast => !podcast.isRead)
console.log("Непрослухані подкасти:", unlistedPodcasts)

let artTopic = podcastPlaylist.find(podcast => podcast.topic === "Мистецтво")
console.log("Подкасти про мистецтво:", artTopic)

function addPodcastToPlaylist() {
    let title = prompt("Введіть назву підкасту:")
    if (title === null) return;
    let author = prompt("Введіть автора підкасту:")
    if (author === null) return;
    while (true) {
        let durationInput = prompt("Введіть тривалість подкасту в хвилинах:");
        if (durationInput === null) return;
        duration = +durationInput;

        if (!isNaN(duration) && duration > 0) {
            break;
        } else {
            alert("Введіть коректне число для тривалості.");
        }
    }
    let topic = prompt("Введіть тему підкасту")
    if (topic === null) return;
    let isListened = confirm("Чи прослухано підкаст?")

    podcastPlaylist.push({ title, author, duration ,topic , isListened })
    displayPlaylist()
}
addPodcastToPlaylist()

function calculateAverageDuration() {
    let totalDration = podcastPlaylist.reduce((sum, podcast) => sum + podcast.duration, 0);
    let averageDuration = Math.round(totalDration / podcastPlaylist.length);
    console.log(`Середня тривалість подкастів: `,averageDuration);
}
calculateAverageDuration()
