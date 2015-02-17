from django.db import models

class SimulationResult(models.Model):
    params = models.CharField(primary_key=True, max_length=1000)
    results = models.BinaryField()
    def __str__(self):
        return 'SimulationResult of %s' % self.params
