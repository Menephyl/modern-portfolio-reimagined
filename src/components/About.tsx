import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Rocket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Code2,
      title: "Código Limpo",
      description: "Desenvolvimento com boas práticas e arquitetura escalável",
    },
    {
      icon: Rocket,
      title: "Inovação",
      description: "Sempre explorando novas tecnologias e soluções modernas",
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalho em equipe e compartilhamento de conhecimento",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções que fazem a diferença
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <p className="text-foreground/80 leading-relaxed text-center">
              Gosto de criar aplicações que façam sentido para quem usa. Analiso
              os desafios de cada projeto e transformo ideias em soluções
              funcionais, claras e bem estruturadas. Valorizo código limpo, boas
              práticas e aprendizado constante, usando cada experiência para
              evoluir tecnicamente e entregar impacto real.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 card-gradient border-border/50">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Trajetória</h3>
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-primary">
                2023-2025
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-lg mb-1">
                  ETEC Aristóteles Ferreira
                </h4>
                <p className="text-muted-foreground">
                  Análise e Desenvolvimento de Sistemas
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-primary">
                2025
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-lg mb-1">
                  Início da Faculdade
                </h4>
                <p className="text-muted-foreground">Ciências da Computação</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
