import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const oilGasTerms = [
    {
      id: 1,
      term: "Drilling Rig",
      definition: "Буровая установка",
      description: "Комплекс оборудования для бурения нефтяных и газовых скважин",
      category: "Бурение",
      difficulty: "Легкий",
      icon: "Drill"
    },
    {
      id: 2,
      term: "Crude Oil",
      definition: "Сырая нефть",
      description: "Природная жидкая смесь углеводородов, добываемая из недр земли",
      category: "Добыча",
      difficulty: "Легкий",
      icon: "Fuel"
    },
    {
      id: 3,
      term: "Reservoir",
      definition: "Нефтяной резервуар",
      description: "Пористая горная порода, содержащая нефть или газ",
      category: "Геология",
      difficulty: "Средний",
      icon: "Mountain"
    },
    {
      id: 4,
      term: "Pipeline",
      definition: "Трубопровод",
      description: "Система труб для транспортировки нефти и газа",
      category: "Транспорт",
      difficulty: "Легкий",
      icon: "Pipe"
    },
    {
      id: 5,
      term: "Refinery",
      definition: "Нефтеперерабатывающий завод",
      description: "Промышленное предприятие для переработки сырой нефти",
      category: "Переработка",
      difficulty: "Средний",
      icon: "Factory"
    },
    {
      id: 6,
      term: "Upstream",
      definition: "Разведка и добыча",
      description: "Сектор нефтегазовой отрасли, включающий поиск и добычу углеводородов",
      category: "Отрасль",
      difficulty: "Сложный",
      icon: "TrendingUp"
    },
    {
      id: 7,
      term: "Downstream",
      definition: "Переработка и сбыт",
      description: "Сектор нефтегазовой отрасли, включающий переработку и продажу продуктов",
      category: "Отрасль",
      difficulty: "Сложный",
      icon: "TrendingDown"
    },
    {
      id: 8,
      term: "Wellhead",
      definition: "Устье скважины",
      description: "Оборудование, установленное на поверхности над нефтяной скважиной",
      category: "Добыча",
      difficulty: "Средний",
      icon: "Circle"
    }
  ];

  const currentCard = oilGasTerms[currentCardIndex];
  const progress = ((studiedCards / oilGasTerms.length) * 100);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const threshold = 50;
    
    if (distance > threshold && currentCardIndex < oilGasTerms.length - 1) {
      handleNext();
    } else if (distance < -threshold && currentCardIndex > 0) {
      handlePrev();
    }
  }, [touchEnd]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < oilGasTerms.length - 1) {
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
    if (studiedCards < oilGasTerms.length) {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Бурение": return "bg-blue-100 text-blue-800";
      case "Добыча": return "bg-orange-100 text-orange-800";
      case "Переработка": return "bg-purple-100 text-purple-800";
      case "Транспорт": return "bg-cyan-100 text-cyan-800";
      case "Геология": return "bg-emerald-100 text-emerald-800";
      case "Отрасль": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Mobile Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Icon name="Fuel" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Oil & Gas English</h1>
                <p className="text-xs text-slate-300">Нефтегазовый английский</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-xs text-slate-400">Прогресс</div>
                <div className="text-sm font-semibold text-orange-400">{studiedCards}/{oilGasTerms.length}</div>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs">ОГ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-slate-800/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Изучено терминов</span>
          <span className="text-sm text-orange-400">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-slate-700" />
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Card Counter */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2">
            <span className="text-sm text-slate-300">Карточка</span>
            <span className="text-sm font-semibold text-orange-400">{currentCardIndex + 1} из {oilGasTerms.length}</span>
          </div>
        </div>

        {/* Study Card */}
        <div className="flex justify-center mb-6">
          <div 
            className="relative w-full max-w-sm"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Card 
              className={`h-80 cursor-pointer transition-all duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              } bg-slate-800/50 border-slate-600 backdrop-blur-sm`}
              onClick={handleFlip}
            >
              {/* Front of card */}
              <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={getDifficultyColor(currentCard.difficulty)}>
                      {currentCard.difficulty}
                    </Badge>
                    <Badge className={getCategoryColor(currentCard.category)}>
                      {currentCard.category}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <Icon name={currentCard.icon as any} className="text-orange-400 mx-auto mb-3" size={48} />
                  </div>
                  <CardTitle className="text-xl text-orange-400 mb-2">{currentCard.term}</CardTitle>
                  <p className="text-sm text-slate-400">
                    Нажмите для перевода
                  </p>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="RotateCcw" className="text-slate-500 mx-auto mb-2" size={24} />
                    <p className="text-xs text-slate-500">Свайп влево/вправо для навигации</p>
                  </div>
                </CardContent>
              </div>

              {/* Back of card */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-green-400 mb-3">{currentCard.definition}</CardTitle>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentCard.description}
                  </p>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Check" className="text-green-400 mx-auto mb-2" size={32} />
                    <p className="text-xs text-slate-400">Понятно? Нажмите "Знаю"</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex justify-center gap-2 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleFlip}
            className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 px-4"
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
          
          <Button 
            size="sm"
            onClick={handleKnow}
            disabled={currentCardIndex === oilGasTerms.length - 1}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
          >
            <Icon name="Check" size={16} />
            Знаю
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleNext}
            disabled={currentCardIndex === oilGasTerms.length - 1}
            className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-300">Изучено</CardTitle>
                <Icon name="BookOpen" className="text-blue-400" size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-blue-400">{studiedCards}</div>
              <p className="text-xs text-slate-500">из {oilGasTerms.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-300">Категории</CardTitle>
                <Icon name="FolderOpen" className="text-orange-400" size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-orange-400">6</div>
              <p className="text-xs text-slate-500">областей</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-300">Прогресс</CardTitle>
                <Icon name="TrendingUp" className="text-green-400" size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-400">{Math.round(progress)}%</div>
              <p className="text-xs text-slate-500">завершено</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-slate-300">Сегодня</CardTitle>
                <Icon name="Calendar" className="text-purple-400" size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-400">{studiedCards}</div>
              <p className="text-xs text-slate-500">терминов</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;