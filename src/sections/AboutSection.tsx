import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Container from "../components/layout/Container";
import { characters } from "../data/characters";
import Chip from "../components/ui/Chip";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-jelly-mint rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-jelly-lavender rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-title text-text-choco mb-4">
            🧪 연구소 팀원들
          </h2>
          <p className="text-text-rosegray font-body text-lg">
            Dream Candy Lab을 이끌어가는 달콤한 친구들을 소개합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="text-center relative">
                {/* 캐릭터 이모지 */}
                <motion.div
                  className="text-7xl mb-4"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {character.emoji}
                </motion.div>

                {/* 이름 & 역할 */}
                <h3 className="font-title text-xl text-text-choco mb-2">
                  {character.name}
                </h3>
                <Chip label={character.role} color={character.color} size="sm" />

                {/* 설명 */}
                <p className="text-sm text-text-rosegray font-body mt-4 mb-4 leading-relaxed">
                  {character.description}
                </p>

                {/* 대사 */}
                <div className="bg-gradient-to-r from-jelly-yellow/10 to-jelly-pink/10 rounded-lg p-3 text-xs text-text-choco font-body italic">
                  "{character.quote}"
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}




