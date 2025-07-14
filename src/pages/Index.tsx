import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(0);

  const medicalTerms = [
    {
      id: 1,
      term: "Myocardial Infarction",
      definition: "Инфаркт миокарда",
      description: "Отмирание участка сердечной мышцы из-за нарушения кровоснабжения",
      category: "Кардиология",
      difficulty: "Средний"
    },
    {
      id: 2,
      term: "Pneumonia",
      definition: "Пневмония",
      description: "Воспаление легких, чаще всего вызванное инфекцией",
      category: "Пульмонология",
      difficulty: "Легкий"
    },
    {
      id: 3,
      term: "Cerebrovascular Accident",
      definition: "Инсульт",
      description: "Острое нарушение мозгового кровообращения",
      category: "Неврология",
      difficulty: "Сложный"
    },
    {
      id: 4,
      term: "Hypertension",
      definition: "Артериальная гипертензия",
      description: "Повышенное артериальное давление",
      category: "Кардиология",
      difficulty: "Легкий"
    },
    {
      id: 5,
      term: "Diabetes Mellitus",
      definition: "Сахарный диабет",
      description: "Группа эндокринных заболеваний, связанных с нарушением усвоения глюкозы",
      category: "Эндокринология",
      difficulty: "Средний"
    }
  ];

  const currentCard = medicalTerms[currentCardIndex];
  const progress = ((studiedCards / medicalTerms.length) * 100);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < medicalTerms.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKnow = () => {
    if (!studiedCards || studiedCards < medicalTerms.length) {
      setStudiedCards(studiedCards + 1);
    }
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легкий": return "bg-green-100 text-green-800";
      case "Средний": return "bg-yellow-100 text-yellow-800";
      case "Сложный": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Icon name="Stethoscope" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medical English</h1>
                <p className="text-sm text-gray-600">Изучение медицинского английского</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">Прогресс</div>
                <div className="text-lg font-semibold text-blue-600">{studiedCards}/{medicalTerms.length}</div>
              </div>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">МС</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Ваш прогресс</h2>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Study Card */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Card className={`w-96 h-64 cursor-pointer transition-all duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`} onClick={handleFlip}>
              {/* Front of card */}
              <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(currentCard.difficulty)}>
                      {currentCard.difficulty}
                    </Badge>
                    <Badge variant="outline">{currentCard.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-600 mb-2">{currentCard.term}</CardTitle>
                  <CardDescription className="text-gray-600">
                    Нажмите, чтобы увидеть перевод
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Icon name="RotateCcw" className="text-gray-400" size={48} />
                </CardContent>
              </div>

              {/* Back of card */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl text-green-600 mb-2">{currentCard.definition}</CardTitle>
                  <CardDescription className="text-gray-700 text-base">
                    {currentCard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Icon name="Check" className="text-green-500" size={48} />
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
          >
            <Icon name="ChevronLeft" size={16} />
            Назад
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleFlip}
            className="px-6"
          >
            <Icon name="RotateCcw" size={16} />
            Перевернуть
          </Button>
          
          <Button 
            onClick={handleKnow}
            disabled={currentCardIndex === medicalTerms.length - 1}
            className="bg-green-600 hover:bg-green-700"
          >
            <Icon name="Check" size={16} />
            Знаю
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleNext}
            disabled={currentCardIndex === medicalTerms.length - 1}
          >
            Далее
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Изучено терминов</CardTitle>
              <Icon name="BookOpen" className="text-blue-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studiedCards}</div>
              <p className="text-xs text-gray-600">из {medicalTerms.length} терминов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Категории</CardTitle>
              <Icon name="FolderOpen" className="text-green-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">5</div>
              <p className="text-xs text-gray-600">медицинских областей</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Сегодня</CardTitle>
              <Icon name="Calendar" className="text-purple-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{studiedCards}</div>
              <p className="text-xs text-gray-600">изучено сегодня</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;