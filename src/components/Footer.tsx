import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/menephyl",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/menephyl/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/yanxmenephyl",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: "mailto:contato@example.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">YM</h3>
            <p className="text-muted-foreground text-sm">
              Desenvolvedor Full-Stack apaixonado por criar experiências
              digitais incríveis e funcionais.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Sobre
              </a>
              <a
                href="#skills"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Habilidades
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Projetos
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contato
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Redes Sociais</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} Yan Menephyl. Todos os direitos reservados.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Feito com <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
              usando React + TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
