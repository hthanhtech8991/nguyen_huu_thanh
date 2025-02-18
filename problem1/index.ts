const outputSummation = (n, sum) => {
    if(n===1) return 1;
    return `sum_to_n${n} === ${Array.from({ length: n }, (_, i) => i + 1).join(' + ')}=== ${sum}`;
}

const sum_to_n_a = (n) => {
    let sum = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
    return outputSummation(n, sum);
}
console.log(sum_to_n_a(5));

const sum_to_n_b = (n) => {
    let sum =  n * (n + 1) / 2;
    return outputSummation(n, sum);
}
console.log(sum_to_n_b(5));

const sum_to_n_c = (n) => {
    let sum = 0;
    let i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    return outputSummation(n, sum);
}
console.log(sum_to_n_c(5));