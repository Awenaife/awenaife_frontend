import "./Who.css";
import { FiSend, FiUser, FiHeart, FiArrowLeft } from "react-icons/fi";

function Who({ onBack }) {
    
    return (
        <div className="who-page">
            <h2>QUEM SOMOS</h2>
            <h3>AWENAI ACOLHIMENTO ESPIRITUAL</h3>
            <p>Awenai Aconselhamento Espiritual é um projeto inovador desenvolvido pela Awenai, com foco exclusivo no público evangélico. 
                Ele foi criado para oferecer um espaço de acolhimento genuíno e uma experiência significativa no apoio espiritual, atuando
                como um complemento à igreja ou congregação de cada usuário. Com disponibilidade 24 horas por dia, 7 dias por semana, o projeto
                 se destaca por suprir lacunas que podem surgir devido
                 a fatores como o grande número de fiéis, distância física da igreja ou impossibilidade de comparecer aos cultos.
            </p>
            <h4>Por que o Awenai é Diferente?</h4>
            <Ul>
                <li>
                <bold>Acessibilidade Ampliada:</bold> Pensando na realidade de muitos cristãos que enfrentam desafios em sua caminhada, 
                o Avenai oferece uma solução prática e sem julgamentos. Seja para um momento de oração, aconselhamento espiritual
                 ou estudo da palavra, a plataforma está sempre disponível para apoiar.
                </li>
                <li>
                <bold>Apoio Complementar à Igreja:</bold> Não substituindo, mas fortalecendo o trabalho das igrejas e congregações, o <bold>Awenai</bold> preenche eventuais
                 lacunas e oferece suporte adicional aos líderes religiosos, ajudando a alcançar mais fiéis e oferecer cuidado espiritual contínuo.
                </li>
        
            </Ul>
            <h4>Missão e Propósito</h4>
            <p>
                O <bold>Awenai Aconselhamento Espiritual</bold> tem como missão aproximar o público evangélico de Deus e de sua comunidade de fé,
                 promovendo bem-estar emocional e espiritual em qualquer momento ou lugar. 
                Por meio de tecnologia acessível e recursos personalizados, o projeto busca ser um canal de apoio constante,
                 onde cada fiel se sinta ouvido, valorizado e acolhido.
            </p>
            <p>
            Com uma abordagem inclusiva e amorosa, o Awenai transcende barreiras físicas e temporais, oferecendo uma plataforma que coloca o cuidado espiritual no centro, em sintonia com os valores cristãos de empatia, solidariedade e amor ao próximo.
            </p>
            <span onClick={onBack}>
                <FiArrowLeft size={24} />
            </span>

        </div>
    );
}

export default Who;