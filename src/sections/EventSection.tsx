import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Container from "../components/layout/Container";
import { events } from "../data/events";

export default function EventSection() {
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      ongoing: '진행중',
      upcoming: '예정',
      ended: '종료',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'yellow' | 'pink' | 'mint' | 'lavender'> = {
      ongoing: 'pink',
      upcoming: 'yellow',
      ended: 'lavender',
    };
    return colors[status] || 'lavender';
  };

  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-80 h-80 bg-jelly-lavender rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-jelly-yellow rounded-full blur-3xl" />
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
            📅 시즌 실험 노트
          </h2>
          <p className="text-text-rosegray font-body text-lg">
            특별한 계절과 함께하는 한정 젤리 이벤트
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <Chip 
                    label={getStatusLabel(event.status)} 
                    color={getStatusColor(event.status)} 
                  />
                  <Chip 
                    label={event.date} 
                    color={event.color} 
                    size="sm" 
                  />
                </div>

                <h3 className="font-title text-2xl text-text-choco mb-3">
                  {event.title}
                </h3>

                <p className="text-text-rosegray font-body leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* 색상 인디케이터 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-rosegray font-body">테마 컬러:</span>
                  <div 
                    className={`w-8 h-8 rounded-full bg-jelly-${event.color} shadow-md`}
                    style={{
                      background: `linear-gradient(135deg, var(--jelly-${event.color}), rgba(255,255,255,0.5))`,
                    }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}




