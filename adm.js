async function fetchAndDisplayData() {
    try {
        // URL do Opensheets para acessar os dados da planilha
        const sheetURL = 'https://opensheet.vercel.app/1oNueZwCMeO3UG7meAXbisu7jpDwA-C3g8d-4Qf23Yyo/Adm';

        // Busca os dados da planilha
        const response = await fetch(sheetURL);
        const data = await response.json();

        // Informações sobre os cargos
        const rolesInfo = {
            'Administrador': 'Responsável pela gestão e organização geral da equipe.',
            'Desenvolvedor': 'Encargado de criar e manter sistemas e aplicações.',
            'Conselheiro': 'Fornece orientação estratégica e suporte à equipe.',
            'Moderador': 'Garante o cumprimento das regras e a mediação de conflitos.'
        };

        // Elemento onde os dados serão exibidos
        const container = document.getElementById('dataContainer');
        container.innerHTML = '';

        // Exibe os dados por cargo
        Object.keys(rolesInfo).forEach(role => {
            const roleSection = document.createElement('div');

            // Título do cargo
            const roleTitle = document.createElement('h4');
            roleTitle.id = role;
            roleTitle.textContent = role;

            // Descrição do cargo
            const roleDescription = document.createElement('p');
            roleDescription.textContent = rolesInfo[role];

            // Lista de nomes
            const roleList = document.createElement('ul');
            data.filter(person => person.CARGO === role).forEach(person => {
                const listItem = document.createElement('li');
                listItem.textContent = person.NOME;
                roleList.appendChild(listItem);
            });

            roleSection.appendChild(roleTitle);
            roleSection.appendChild(roleDescription);
            roleSection.appendChild(roleList);
            container.appendChild(roleSection);
        });

        // Atualização de informações do autor, data e hora
        const firstRow = data[0]; // Primeira linha da planilha
        if (firstRow.AUTOR && firstRow.DATA && firstRow.HORA) {
            const footer = document.getElementById('footer');
            footer.innerText = `Atualizado por: ${firstRow.AUTOR} • ${firstRow.DATA} ${firstRow.HORA}`;
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        document.getElementById('dataContainer').textContent = 'Erro ao carregar os dados.';
    }
}

// Executa a função após carregar a página
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);
