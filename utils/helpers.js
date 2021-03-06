module.exports = {
    format_date: date => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[new Date(date).getMonth()]}&nbsp;${new Date(date).getDate()},&nbsp;${new Date(date).getFullYear()}.`
    },
    format_plural: (word, amount) => {
        if (amount != 1) {
            return `${word}s`;
        }
        return word;
    },
    format_cut_content: content => {
        return content.substring(0,200);
    },
    format_posts: content => {
        const regExp = new RegExp('\\n\\n', 'g');
        return content
            .toString()
            .replace(regExp, `</p>  
<p>`)
    }
}