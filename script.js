document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('api-key');
    const saveButton = document.getElementById('save-button');
    const setupSection = document.getElementById('setup-section');
    const mainSection = document.getElementById('main-section');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertedAmount = document.getElementById('converted-amount');
    const changeKeyLink = document.getElementById('change-key-link');
    const toggleThemeLink = document.getElementById('toggle-theme-link');

    const priorityCurrencies = ['CNY', 'USD', 'JPY', 'HKD', 'EUR', 'TWD', 'GBP'];

    // 读取数据库中的API Key
    utools.db.promises.get('apiKey').then(storedApiKey => {
        if (storedApiKey) {
            initializeApp(storedApiKey.data);
        } else {
            setupSection.style.display = 'block';
        }
    }).catch(error => {
        console.error('Error retrieving API key:', error);
        setupSection.style.display = 'block';
    });

    // 保存API Key到数据库
    saveButton.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value;
        if (apiKey) {
            try {
                await utools.db.promises.put({
                    _id: 'apiKey',
                    data: apiKey
                });
                setupSection.style.display = 'none';
                initializeApp(apiKey);
            } catch (error) {
                console.error('Error saving API key:', error);
            }
        } else {
            alert('请输入有效的API Key');
        }
    });

    // 重新设置API Key
    changeKeyLink.addEventListener('click', () => {
        mainSection.style.display = 'none';
        setupSection.style.display = 'block';
    });

    // 切换黑暗模式
    toggleThemeLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        utools.dbStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    function initializeApp(apiKey) {
        setupSection.style.display = 'none';
        mainSection.style.display = 'block';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

        // 获取货币数据并填充选择元素
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const currencies = Object.keys(data.conversion_rates);
                const sortedCurrencies = [...priorityCurrencies, ...currencies.filter(currency => !priorityCurrencies.includes(currency))];

                sortedCurrencies.forEach(currency => {
                    const optionFrom = document.createElement('option');
                    optionFrom.value = currency;
                    optionFrom.textContent = currency;
                    fromCurrency.appendChild(optionFrom);

                    const optionTo = document.createElement('option');
                    optionTo.value = currency;
                    optionTo.textContent = currency;
                    toCurrency.appendChild(optionTo);
                });

                // 默认选择人民币和美元
                fromCurrency.value = 'CNY';
                toCurrency.value = 'USD';
            });

        // 监听事件并进行货币转换
        amountInput.addEventListener('input', convertCurrency);
        fromCurrency.addEventListener('change', convertCurrency);
        toCurrency.addEventListener('change', convertCurrency);

        function convertCurrency() {
            const amount = amountInput.value;
            const from = fromCurrency.value;
            const to = toCurrency.value;

            if (amount === '' || isNaN(amount)) {
                convertedAmount.textContent = '0';
                return;
            }

            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.conversion_rate;
                    const result = (amount * rate).toFixed(2);
                    convertedAmount.textContent = `${result} ${to}`;
                });
        }

        // 读取数据库中的主题设置
        const storedTheme = utools.dbStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // 使用utools.shellOpenExternal打开外部链接
    document.querySelectorAll('.external-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            utools.shellOpenExternal(e.target.href);
        });
    });
});
