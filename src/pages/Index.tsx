
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "De acordo com o plano de resposta, qual é a composição mínima essencial da equipe de resposta a incidentes (CSIRT)?",
    options: [
      "DPO (Encarregado), um Analista de TI e um representante do Jurídico.",
      "Diretor de TI, Gerente de Projetos e um Auditor Externo.",
      "Apenas o DPO (Encarregado) e a equipe de Segurança da Informação.",
      "Recursos Humanos, a equipe de Comunicação e o Jurídico."
    ],
    correctAnswer: 0,
    hint: "Pense nos três pilares de responsabilidade durante um incidente: dados, tecnologia e lei.",
    explanation: "Esta combinação cobre as responsabilidades de conformidade com a LGPD, a resposta técnica ao incidente e as implicações legais."
  },
  {
    id: 2,
    question: "Qual é o principal objetivo da fase de 'Contenção' durante um incidente de segurança?",
    options: [
      "Remover completamente o malware e corrigir a vulnerabilidade.",
      "Interromper o avanço do incidente para evitar mais danos.",
      "Notificar a ANPD e os titulares dos dados sobre o ocorrido.",
      "Analisar o que deu errado para evitar futuros incidentes."
    ],
    correctAnswer: 1,
    hint: "O que você faria primeiro para impedir que um incêndio se espalhasse pela casa?",
    explanation: "A contenção foca em limitar o impacto imediato, isolando os sistemas afetados para estabilizar a situação."
  },
  {
    id: 3,
    question: "A fase de 'Erradicação' visa principalmente...",
    options: [
      "Restaurar os sistemas a partir de backups.",
      "Isolar a máquina comprometida da rede.",
      "Remover a causa raiz do incidente e componentes maliciosos.",
      "Identificar se dados pessoais foram afetados."
    ],
    correctAnswer: 2,
    hint: "Depois de apagar o fogo, o que você precisa fazer para garantir que ele não reacenda?",
    explanation: "A erradicação garante que a ameaça seja completamente eliminada do ambiente, tratando a origem do problema."
  },
  {
    id: 4,
    question: "Quando a notificação de um incidente de segurança à ANPD se torna obrigatória?",
    options: [
      "Sempre que um sistema de segurança, como um firewall, falha.",
      "Apenas quando dados de mais de 10.000 titulares são vazados.",
      "Quando o incidente pode acarretar risco ou dano relevante aos titulares.",
      "Em qualquer caso de acesso não autorizado, mesmo que sem danos."
    ],
    correctAnswer: 2,
    hint: "A obrigação não é sobre o incidente em si, mas sobre as possíveis consequências para as pessoas.",
    explanation: "Este é o critério central da LGPD, focando no impacto potencial sobre os direitos e liberdades dos indivíduos."
  },
  {
    id: 5,
    question: "Qual é o prazo recomendado pela ANPD para a notificação de um incidente após a empresa tomar ciência dele?",
    options: [
      "2 dias úteis.",
      "10 dias corridos.",
      "7 dias úteis.",
      "Até 30 dias, desde que justificado."
    ],
    correctAnswer: 0,
    hint: "A recomendação busca agilidade na comunicação com a autoridade. Pense em horas, não em semanas.",
    explanation: "Este é o prazo que a ANPD considera razoável para a comunicação formal do incidente, permitindo uma resposta rápida."
  },
  {
    id: 6,
    question: "O que é fundamental na fase de 'Recuperação'?",
    options: [
      "Apenas restaurar os dados a partir do backup mais recente.",
      "Restaurar os sistemas ao normal e monitorá-los para garantir a estabilidade e segurança.",
      "Manter os sistemas offline até que uma auditoria externa seja concluída.",
      "Documentar o que foi aprendido com o incidente."
    ],
    correctAnswer: 1,
    hint: "O objetivo não é apenas voltar a operar, mas voltar a operar de forma confiável.",
    explanation: "A recuperação envolve restaurar a operação de forma segura e acompanhar o ambiente para confirmar que o problema foi resolvido."
  },
  {
    id: 7,
    question: "Qual é a finalidade principal da fase de 'Lições Aprendidas'?",
    options: [
      "Punir os colaboradores que cometeram erros.",
      "Calcular o prejuízo financeiro causado pelo incidente.",
      "Apenas arquivar um relatório sobre o que aconteceu.",
      "Analisar o incidente para fortalecer as defesas e evitar sua repetição."
    ],
    correctAnswer: 3,
    hint: "Pense no ditado 'errar é humano, mas persistir no erro...'.",
    explanation: "Esta fase foca em transformar um evento negativo em uma oportunidade de aprimorar a segurança e os processos."
  },
  {
    id: 8,
    question: "Ao comunicar um incidente aos titulares dos dados, qual abordagem a empresa deve adotar?",
    options: [
      "Enviar um relatório técnico detalhado com jargões de segurança.",
      "Publicar uma nota genérica no site, sem especificar os dados afetados.",
      "Usar uma comunicação clara, simples e objetiva, explicando os riscos e as medidas a tomar.",
      "Esperar que os titulares entrem em contato para perguntar sobre o incidente."
    ],
    correctAnswer: 2,
    hint: "Como você gostaria de ser informado se seus dados fossem expostos? Com termos técnicos ou de forma direta?",
    explanation: "A clareza e a objetividade ajudam o titular a entender a situação e a agir para mitigar seus próprios riscos."
  },
  {
    id: 9,
    question: "Na fase de 'Identificação', qual das seguintes é uma fonte comum para detectar um incidente?",
    options: [
      "Alertas de ferramentas automatizadas, como SIEM ou antivírus.",
      "Um relatório de auditoria anual.",
      "A criação de uma nova política de segurança.",
      "A conclusão de um treinamento de conscientização."
    ],
    correctAnswer: 0,
    hint: "Muitas vezes, a detecção não depende de uma pessoa, mas de sistemas que vigiam o ambiente digital constantemente.",
    explanation: "Sistemas de monitoramento contínuo são projetados para detectar anomalias e atividades suspeitas em tempo real."
  },
  {
    id: 10,
    question: "Uma empresa descobre um incidente envolvendo dados financeiros de alguns clientes. Mesmo que os dados estejam criptografados, a notificação pode ser obrigatória se...",
    options: [
      "Os dados afetados forem de clientes de outro país.",
      "Houver suspeita de que a chave de criptografia também foi comprometida.",
      "O incidente tiver sido causado por um erro humano interno.",
      "A empresa possuir um seguro contra ataques cibernéticos."
    ],
    correctAnswer: 1,
    hint: "Uma porta trancada não é segura se o ladrão também levou a chave.",
    explanation: "Se a proteção criptográfica pode ser quebrada, a proteção deixa de ser efetiva e o risco aos titulares se torna relevante."
  }
];

const Index = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setUserAnswers([]);
  };

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameState('finished');
    }
  };

  const getButtonStyle = (optionIndex: number) => {
    if (selectedAnswer === null) {
      return "bg-slate-700 hover:bg-slate-600 text-white border-slate-600 transition-all duration-200";
    }
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      return "bg-green-600 text-white border-green-500";
    }
    
    if (optionIndex === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) {
      return "bg-red-600 text-white border-red-500";
    }
    
    return "bg-slate-700 text-slate-400 border-slate-600 opacity-70";
  };

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center space-y-6 p-8">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-4xl font-bold text-white">
                Quiz: Resposta a Incidentes e LGPD
              </CardTitle>
              <p className="text-slate-300 text-lg leading-relaxed">
                Teste seus conhecimentos sobre resposta a incidentes de segurança e conformidade com a LGPD. 
                São 10 perguntas que abordam desde a composição de equipes até prazos de notificação.
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="text-center space-y-6">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">O que você vai encontrar:</p>
                <div className="flex justify-center space-x-6 text-sm">
                  <span className="text-cyan-400">10 Perguntas</span>
                  <span className="text-cyan-400">Feedback Imediato</span>
                  <span className="text-cyan-400">Explicações Detalhadas</span>
                </div>
              </div>
              <Button 
                onClick={startQuiz}
                className="w-full text-xl py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Iniciar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    const getMessage = () => {
      if (percentage >= 90) return "Excelente! Você domina o assunto! 🏆";
      if (percentage >= 70) return "Muito bom! Você tem um bom conhecimento! 👏";
      if (percentage >= 50) return "Bom trabalho! Continue estudando! 📚";
      return "Continue aprendendo, você vai conseguir! 💪";
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center space-y-6 p-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Quiz Concluído!
            </CardTitle>
            <div className="space-y-4">
              <p className="text-2xl text-cyan-400 font-semibold">
                Você acertou {score} de {questions.length} perguntas!
              </p>
              <p className="text-slate-300 text-lg">
                {getMessage()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Resumo do seu desempenho:</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-600 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{score}</div>
                    <div className="text-green-100 text-sm">Acertos</div>
                  </div>
                  <div className="bg-red-600 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{questions.length - score}</div>
                    <div className="text-red-100 text-sm">Erros</div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={startQuiz}
                className="w-full text-xl py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Quiz: Resposta a Incidentes e LGPD</h1>
            <span className="text-cyan-400 font-semibold">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl text-white leading-relaxed mb-4">
              {question.question}
            </CardTitle>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-300 text-sm">
                <span className="text-cyan-400 font-semibold">💡 Dica:</span> {question.hint}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-6 text-left justify-start text-wrap h-auto ${getButtonStyle(index)}`}
                  variant="outline"
                >
                  <span className="flex items-start">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-0.5 flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </span>
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="space-y-6">
                <div className="bg-slate-700 rounded-lg p-6 border-l-4 border-cyan-500">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Explicação:
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
                </div>
                <Button 
                  onClick={nextQuestion}
                  className="w-full text-lg py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
