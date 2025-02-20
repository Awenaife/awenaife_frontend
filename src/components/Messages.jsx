import Header from "./Header";
import "./Messages.css";
import imgAvatar from "/assets/video_tik_tok.png";

function Messages() {
    return (
        <div className="messages-page">
            <Header />
            <main className="content">
                <section className="principal">
                    <div className="citacao"><span>"</span>Amados, amemo-nos uns aos outros, porque o amor é de Deus; e todo aquele que ama é nascido de Deus e conhece a Deus.<span>"</span></div>
                    <div className="autor">João 4:7</div> 
                    <div className="sermao">É importante lembrar que somos chamados a amar todas as pessoas, independentemente de sua orientação sexual. O amor é fundamental em nossas interações. Em relação ao seu amigo Jean, você pode demonstrar amor e respeito por ele, independentemente de suas escolhas ou identidade. É sempre bom manter um diálogo aberto e acolhedor, mostrando que você se importa com ele como pessoa. Ao mesmo tempo, é essencial que você permaneça firme nos princípios da fé cristã, buscando sempre a orientação da Palavra de Deus. Se houver oportunidades de conversar sobre questões espirituais, faça isso com amor e sensibilidade, sempre respeitando sua individualidade e crenças. O objetivo é ser uma luz na vida dele, refletindo o amor e a graça de Deus. 
                        Lembre-se de que a graça de Deus é suficiente para todos nós, e nosso papel é ser instrumentos de amor e paz. Que você possa ser uma bênção na vida do seu amigo! Deus te abençoe!
                    </div>
                </section>
                <section className="avatar">
                     <img src={imgAvatar} />
                </section>
            </main>
        </div>
    );
}

export default Messages;
