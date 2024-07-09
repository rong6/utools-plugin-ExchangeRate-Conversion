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
    const exchangeButton = document.getElementById('exchange-button');

    const priorityCurrencies = ['CNY', 'USD', 'JPY', 'HKD', 'EUR', 'TWD', 'GBP'];
    const currencyNames = {
        ARS: '阿根廷比索',
        LYD: '利比亚第纳尔',
        SSP: '南苏丹镑',
        SYP: '叙利亚镑',
        VES: '委内瑞拉玻利瓦尔',
        YER: '也门里亚尔',
        ZWL: '津巴布韦元',
        AED: '阿联酋迪拉姆',
        AFN: '阿富汗尼',
        ALL: '阿尔巴尼亚列克',
        AMD: '亚美尼亚德拉姆',
        ANG: '荷属安的列斯盾',
        AOA: '安哥拉宽扎',
        AUD: '澳元',
        AWG: '阿鲁巴弗罗林',
        AZN: '阿塞拜疆马纳特',
        BAM: '波斯尼亚和黑塞哥维那可兑换马克',
        BBD: '巴巴多斯元',
        BDT: '孟加拉塔卡',
        BGN: '保加利亚列弗',
        BHD: '巴林第纳尔',
        BIF: '布隆迪法郎',
        BMD: '百慕大元',
        BND: '文莱元',
        BOB: '玻利维亚诺',
        BRL: '巴西雷亚尔',
        BSD: '巴哈马元',
        BTN: '不丹努尔特鲁姆',
        BWP: '博茨瓦纳普拉',
        BYN: '白俄罗斯卢布',
        BZD: '伯利兹元',
        CAD: '加拿大元',
        CDF: '刚果法郎',
        CHF: '瑞士法郎',
        CLP: '智利比索',
        CNY: '人民币',
        COP: '哥伦比亚比索',
        CRC: '哥斯达黎加科朗',
        CUP: '古巴比索',
        CVE: '佛得角埃斯库多',
        CZK: '捷克克朗',
        DJF: '吉布提法郎',
        DKK: '丹麦克朗',
        DOP: '多米尼加比索',
        DZD: '阿尔及利亚第纳尔',
        EGP: '埃及镑',
        ERN: '厄立特里亚纳克法',
        ETB: '埃塞俄比亚比尔',
        EUR: '欧元',
        FJD: '斐济元',
        FKP: '福克兰群岛镑',
        FOK: '法罗群岛克朗',
        GBP: '英镑',
        GEL: '格鲁吉亚拉里',
        GGP: '根西岛镑',
        GHS: '加纳塞地',
        GIP: '直布罗陀镑',
        GMD: '冈比亚达拉西',
        GNF: '几内亚法郎',
        GTQ: '危地马拉格查尔',
        GYD: '圭亚那元',
        HKD: '港元',
        HNL: '洪都拉斯伦皮拉',
        HRK: '克罗地亚库纳',
        HTG: '海地古德',
        HUF: '匈牙利福林',
        IDR: '印尼盾',
        ILS: '以色列新谢克尔',
        IMP: '马恩岛镑',
        INR: '印度卢比',
        IQD: '伊拉克第纳尔',
        IRR: '伊朗里亚尔',
        ISK: '冰岛克朗',
        JEP: '泽西镑',
        JMD: '牙买加元',
        JOD: '约旦第纳尔',
        JPY: '日元',
        KES: '肯尼亚先令',
        KGS: '吉尔吉斯斯坦索姆',
        KHR: '柬埔寨瑞尔',
        KID: '基里巴斯元',
        KMF: '科摩罗法郎',
        KRW: '韩元',
        KWD: '科威特第纳尔',
        KYD: '开曼群岛元',
        KZT: '哈萨克斯坦坚戈',
        LAK: '老挝基普',
        LBP: '黎巴嫩镑',
        LKR: '斯里兰卡卢比',
        LRD: '利比里亚元',
        LSL: '莱索托洛蒂',
        MAD: '摩洛哥迪拉姆',
        MDL: '摩尔多瓦列伊',
        MGA: '马达加斯加阿里亚里',
        MKD: '北马其顿第纳尔',
        MMK: '缅元',
        MNT: '蒙古图格里克',
        MOP: '澳门元',
        MRU: '毛里塔尼亚乌吉亚',
        MUR: '毛里求斯卢比',
        MVR: '马尔代夫拉菲亚',
        MWK: '马拉维克瓦查',
        MXN: '墨西哥比索',
        MYR: '马来西亚林吉特',
        MZN: '莫桑比克梅蒂卡尔',
        NAD: '纳米比亚元',
        NGN: '尼日利亚奈拉',
        NIO: '尼加拉瓜科多巴',
        NOK: '挪威克朗',
        NPR: '尼泊尔卢比',
        NZD: '新西兰元',
        OMR: '阿曼里亚尔',
        PAB: '巴拿马巴波亚',
        PEN: '秘鲁索尔',
        PGK: '巴布亚新几内亚基那',
        PHP: '菲律宾比索',
        PKR: '巴基斯坦卢比',
        PLN: '波兰兹罗提',
        PYG: '巴拉圭瓜拉尼',
        QAR: '卡塔尔里亚尔',
        RON: '罗马尼亚列伊',
        RSD: '塞尔维亚第纳尔',
        RUB: '俄罗斯卢布',
        RWF: '卢旺达法郎',
        SAR: '沙特里亚尔',
        SBD: '所罗门群岛元',
        SCR: '塞舌尔卢比',
        SDG: '苏丹镑',
        SEK: '瑞典克朗',
        SGD: '新加坡元',
        SHP: '圣赫勒拿镑',
        SLE: '塞拉利昂利昂',
        SOS: '索马里先令',
        SRD: '苏里南元',
        STN: '圣多美和普林西比多布拉',
        SZL: '斯威士兰里兰吉尼',
        THB: '泰铢',
        TJS: '塔吉克斯坦索莫尼',
        TMT: '土库曼斯坦马纳特',
        TND: '突尼斯第纳尔',
        TOP: '汤加潘加',
        TRY: '土耳其里拉',
        TTD: '特立尼达和多巴哥元',
        TVD: '图瓦卢元',
        TWD: '新台币',
        TZS: '坦桑尼亚先令',
        UAH: '乌克兰格里夫纳',
        UGX: '乌干达先令',
        USD: '美元',
        UYU: '乌拉圭比索',
        UZS: '乌兹别克斯坦索姆',
        VND: '越南盾',
        VUV: '瓦努阿图瓦图',
        WST: '萨摩亚塔拉',
        XAF: '中非法郎',
        XCD: '东加勒比元',
        XDR: '特别提款权',
        XOF: '西非法郎',
        XPF: '太平洋法郎',
        ZAR: '南非兰特',
        ZMW: '赞比亚克瓦查'
    };


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
                    optionFrom.textContent = `${currencyNames[currency]} (${currency})`;
                    fromCurrency.appendChild(optionFrom);

                    const optionTo = document.createElement('option');
                    optionTo.value = currency;
                    optionTo.textContent = `${currencyNames[currency]} (${currency})`;
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

        // 交换货币按钮
        exchangeButton.addEventListener('click', () => {
            const fromValue = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = fromValue;
            convertCurrency();
        });

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
