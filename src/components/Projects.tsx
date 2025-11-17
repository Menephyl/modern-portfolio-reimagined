import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
}

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Menephyl/repos?sort=updated&per_page=6"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
        toast({
          title: "Erro ao carregar projetos",
          description: "Não foi possível carregar os projetos do GitHub.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [toast]);

  const allLanguages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  );

  const filteredRepos =
    selectedFilter === "all"
      ? repos
      : repos.filter((repo) => repo.language === selectedFilter);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore alguns dos projetos que desenvolvi recentemente
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            className="rounded-full"
          >
            Todos
          </Button>
          {allLanguages.map((language) => (
            <Button
              key={language}
              variant={selectedFilter === language ? "default" : "outline"}
              onClick={() => setSelectedFilter(language!)}
              className="rounded-full"
            >
              {language}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full flex flex-col hover:shadow-glow transition-all duration-300 card-gradient border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl line-clamp-1">
                        {repo.name}
                      </CardTitle>
                      {repo.language && (
                        <Badge variant="secondary" className="ml-2 flex-shrink-0">
                          {repo.language}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                      {repo.description || "Sem descrição disponível"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Código
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" className="flex-1" asChild>
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum projeto encontrado com este filtro.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
